package saml

import (
	"os"
	"strings"
	"testing"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/mock"
)

func TestSamlResponse(t *testing.T) {
	os.Setenv("SAML_PUBLIC_CERT", "testdata/test_cert.pem")
	os.Setenv("SAML_PRIVATE_CERT", "testdata/test_key.pem")
	os.Setenv("SAML_IDP_SSO_URL", "http://localhost:8080")
	os.Setenv("SAML_IDP_SSO_DESC_URL", "http://localhost:8080")
	os.Setenv("SAML_IDP_PUBLIC_CERT", "testdata/test_cert.pem")
	os.Setenv("SAML_SIGN_REQUEST", "1")
	os.Setenv("SAML_CONSUMER_SERVICE_URL", "")
	os.Setenv("SAML_SLO_ENABLED", "1")

	settings := mock.Native{}
	service := &Service{Log: &mock.LogService{}, Env: settings}

	// Create a request
	_, _, err := service.CreateAuthenticationRequest()
	if err != nil {
		t.Fatal(err)
	}

	conf := SamlTestResponseConfig{
		SigningCert:    "testdata/test_cert.pem",
		SigningKey:     "testdata/test_key.pem",
		IDPIssuerUrl:   "http://localhost:8080",
		SSODescription: "http://localhost:8080",
		CallbackURL:    "/auth/saml/callback",
	}
	encodedResponse := CreateSamlTestResponse(t, conf)


	// Validate the response
	username, _, err := service.ValidateAuthenticationResponse(encodedResponse)
	if err != nil || username != "test01" {
		t.Fatal(err)
	}
}

func TestAuthnRequestSignature(t *testing.T) {

	os.Setenv("SAML_PUBLIC_CERT", "testdata/test_cert.pem")
	os.Setenv("SAML_PRIVATE_CERT", "testdata/test_key.pem")
	os.Setenv("SAML_IDP_SSO_URL", "http://localhost:8080")
	os.Setenv("SAML_IDP_SSO_DESC_URL", "http://localhost:8080")
	os.Setenv("SAML_IDP_PUBLIC_CERT", "testdata/test_cert.pem")
	os.Setenv("SAML_SIGN_REQUEST", "1")
	os.Setenv("SAML_CONSUMER_SERVICE_URL", "")

	settings := mock.Native{}
	service := &Service{Log: &mock.LogService{}, Env: settings}

	// Create a request
	_, _, err := service.CreateAuthenticationRequest()
	if err != nil {
		t.Fatal(err)
	}
}

func TestCleanName(t *testing.T) {
	var tests = []struct {
		nameID   string
		expected string
	}{
		{"test01", "test01"},
		{" \t\n test01     \n\n\r\t", "test01"},
		{"t\te\r\nst\n01", "test01"},
		{"123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890", "12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"},
	}

	for _, x := range tests {
		if !strings.EqualFold(cleanName(x.nameID), x.expected) {
			t.Fatalf("Expected name to be '%s' but was '%s'.", x.expected, x.nameID)
		}
	}
}

func TestSAMLResponseType(t *testing.T) {
	settings := mock.Native{}
	service := &Service{Log: &mock.LogService{}, Env: settings}

	encodedLogoutResponse := "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHNhbWwycDpMb2dvdXRSZXNwb25zZSBEZXN0aW5hdGlvbj0iaHR0cDovL2xvY2FsaG9zdDozMDAwL2F1dGgvc2FtbC9jYWxsYmFjayIgSUQ9Il84ZDYzNTllZTk3Mzk5NDdlYTA0MWFlYjQ0Y2RkY2YwYSIgSW5SZXNwb25zZVRvPSJkNzQ0MDVlYS0zNTkxLTQ1NzktOWVkMC0yMTg4MjdlZjA2OWIiIElzc3VlSW5zdGFudD0iMjAxOC0xMS0xNFQxODoyNzoxMC4yNDJaIiBWZXJzaW9uPSIyLjAiIHhtbG5zOnNhbWwycD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOnByb3RvY29sIj48c2FtbDI6SXNzdWVyIEZvcm1hdD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOm5hbWVpZC1mb3JtYXQ6ZW50aXR5IiB4bWxuczpzYW1sMj0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFzc2VydGlvbiI+bG9jYWxob3N0PC9zYW1sMjpJc3N1ZXI+PGRzOlNpZ25hdHVyZSB4bWxuczpkcz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnIyI+CjxkczpTaWduZWRJbmZvPgo8ZHM6Q2Fub25pY2FsaXphdGlvbk1ldGhvZCBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvMTAveG1sLWV4Yy1jMTRuIyIvPgo8ZHM6U2lnbmF0dXJlTWV0aG9kIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnI3JzYS1zaGExIi8+CjxkczpSZWZlcmVuY2UgVVJJPSIjXzhkNjM1OWVlOTczOTk0N2VhMDQxYWViNDRjZGRjZjBhIj4KPGRzOlRyYW5zZm9ybXM+CjxkczpUcmFuc2Zvcm0gQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwLzA5L3htbGRzaWcjZW52ZWxvcGVkLXNpZ25hdHVyZSIvPgo8ZHM6VHJhbnNmb3JtIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS8xMC94bWwtZXhjLWMxNG4jIi8+CjwvZHM6VHJhbnNmb3Jtcz4KPGRzOkRpZ2VzdE1ldGhvZCBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyNzaGExIi8+CjxkczpEaWdlc3RWYWx1ZT5IRUh3SlRhMjJONFpET056ZGIwWm1FeUdISEU9PC9kczpEaWdlc3RWYWx1ZT4KPC9kczpSZWZlcmVuY2U+CjwvZHM6U2lnbmVkSW5mbz4KPGRzOlNpZ25hdHVyZVZhbHVlPgpHelVCSXJ0Y2FOQk45NXJtdlh4ZDJNejhPUms4MDZyN2ZyT1ljVzFYZlB0Q0lDSDNjM3YvSytqcGhNN3QvUVF6M1hIVUdVNkFJYk5PCjNBVmppV3ptZUMyVXlvdTYwRVhvd2FwbTBlVnR0Y1N0VllXc01LeGQyN2t1UjZteHdTMmdhR3pPU0dTOFFQT0o5YTBTM1orajZCVEsKZHBqblVNZllUNjlucjNlOHdYYmlMbmdhc24xMXYzMjdvNFV3VzI2ZjJHS25CdFBXc0lRdjFEN0VrOWZseW13UXhWdmwwWTNwR2FZNApMTUV2M3h4Z1VmTEc0dlRHTkFXd21LakJVY2hUQ3JLdlBkaWdKSkYwL1RkRFg1SU1ZSEQyV28vRjJSQWxMWGY4b0FCV2dnR0RkVXpFCnRNTFhoRW5BaUxoUFczUUJ0M3hLbFVPL09LREtKYWRDNnZaeUNBPT0KPC9kczpTaWduYXR1cmVWYWx1ZT4KPGRzOktleUluZm8+PGRzOlg1MDlEYXRhPjxkczpYNTA5Q2VydGlmaWNhdGU+TUlJRFNUQ0NBakdnQXdJQkFnSUVBb0xRL1RBTkJna3Foa2lHOXcwQkFRc0ZBREJWTVFzd0NRWURWUVFHRXdKVlV6RUxNQWtHQTFVRQpDQk1DUTBFeEZqQVVCZ05WQkFjVERVMXZkVzUwWVdsdUlGWnBaWGN4RFRBTEJnTlZCQW9UQkZkVFR6SXhFakFRQmdOVkJBTVRDV3h2ClkyRnNhRzl6ZERBZUZ3MHhOekEzTVRrd05qVXlOVEZhRncweU56QTNNVGN3TmpVeU5URmFNRlV4Q3pBSkJnTlZCQVlUQWxWVE1Rc3cKQ1FZRFZRUUlFd0pEUVRFV01CUUdBMVVFQnhNTlRXOTFiblJoYVc0Z1ZtbGxkekVOTUFzR0ExVUVDaE1FVjFOUE1qRVNNQkFHQTFVRQpBeE1KYkc5allXeG9iM04wTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFsdVpGZFcxeW5pdHp0a1dMCkM2eEtlZ2JSV3hreSs1UDBwNFNoWUVPa0hzMzBRSTJWQ3VSNlFvNEJ6NXJUZ0xCcmt5MDNXMUdBVnJaeHV2S1JHajlWOStQbWpkR3QKYXU0Q1RYdTlwTExjcW5ydWFjem9TZHZCWUEzbFM5YTd6Z0ZVMCtzNmtNbDJFaEIrcms3Z1hsdUVlcDdsSU9lbnpmbDJmNklvVEthMgpmVmdWZDNZS2lTR3N5TDR0enRTNzB2bW1YMTIxcW0wc1RKZEtXUDRIeFh5cUs5bmVvbFhJOWZZeUhPWUlMVk5aNjl6LzczT09WaGtoCi9tdlRtV1pMTTdHTTZzQXBteUxYNk9YVXA4ejBwa1krdlQvOSt6Unh4UXM3R3VyQzQvQzFuSzNySS8weVNVZ0dFYWZPMWF0TmpZbWwKRk4rTTN0Wlg2bkVjQTZnOTRJYXZ5UUlEQVFBQm95RXdIekFkQmdOVkhRNEVGZ1FVdFM4a0lZeFE4VVZ2VnJaU2RneWlkZTlPSHhVdwpEUVlKS29aSWh2Y05BUUVMQlFBRGdnRUJBQmZrNW1xc1ZVcnBGQ1lUWlpoT3hUUlJwR1hxb1cxRzA1Yk94SHhzNDJQYXh3OHJBSjA2ClB0eTlqcU0xQ2dSUHBxdlphMmxQUUJRcVpySGtkREUwNnE0TkcwRHFNSDhOVCt0TmtYQmU5WVRyZTNFSkNTZnN2c3d0TFZEWjdHRHYKVEhLb2pKalF2ZFZDelJqNlhINVRydXdlZmI0Qkp6OUFQdG5seUpJdmpIazFoZG96cXlPbmlWWmQwUU94TEFiY2R0OTQ2Y2hOZFF2QwptNmFVT3B1dHA4WG9ncjBLQm5FeTNVOGVzMmNBZk5aYUVrUFU4VmE1YlU2WGpueTh6R1FuWENYeFBLcDdzTXBnTzkzblBCdC9saVgxCnFmeVhNN3hFb3RXb3htbTZIWng4b1dROFU1YWlYalo1UktEV0NDcTRadVhsNndWc1V6MWlFNjFzdU81eVdpOD08L2RzOlg1MDlDZXJ0aWZpY2F0ZT48L2RzOlg1MDlEYXRhPjwvZHM6S2V5SW5mbz48L2RzOlNpZ25hdHVyZT48c2FtbDJwOlN0YXR1cz48c2FtbDJwOlN0YXR1c0NvZGUgVmFsdWU9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpzdGF0dXM6U3VjY2VzcyIvPjwvc2FtbDJwOlN0YXR1cz48L3NhbWwycDpMb2dvdXRSZXNwb25zZT4="

	responseType, err := service.ResponseType(encodedLogoutResponse)
	if err != nil {
		t.Fatal(err)
	}

	if responseType != api.LogoutSAMLResponseType {
		t.Fatal("Logout Response should be LogoutResponseType")
	}

	encodedAuthnResponse := "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHNhbWwycDpSZXNwb25zZSBEZXN0aW5hdGlvbj0iaHR0cDovL2xvY2FsaG9zdDozMDAwL2F1dGgvc2FtbC9jYWxsYmFjayIgSUQ9Il8yOGNkM2Q2NDQxZmE1ZGU1NzAzMmRhZjJlZGJmMjMzNiIgSW5SZXNwb25zZVRvPSJfNzNjNTRjZTQtYjRiMS00NjliLTc1NGYtMjNjMTQyODRlYzJkIiBJc3N1ZUluc3RhbnQ9IjIwMTgtMTEtMTRUMTg6MzQ6NTEuODA2WiIgVmVyc2lvbj0iMi4wIiB4bWxuczpzYW1sMnA9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpwcm90b2NvbCI+PHNhbWwyOklzc3VlciBGb3JtYXQ9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpuYW1laWQtZm9ybWF0OmVudGl0eSIgeG1sbnM6c2FtbDI9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphc3NlcnRpb24iPmxvY2FsaG9zdDwvc2FtbDI6SXNzdWVyPjxkczpTaWduYXR1cmUgeG1sbnM6ZHM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyMiPgo8ZHM6U2lnbmVkSW5mbz4KPGRzOkNhbm9uaWNhbGl6YXRpb25NZXRob2QgQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzEwL3htbC1leGMtYzE0biMiLz4KPGRzOlNpZ25hdHVyZU1ldGhvZCBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyNyc2Etc2hhMSIvPgo8ZHM6UmVmZXJlbmNlIFVSST0iI18yOGNkM2Q2NDQxZmE1ZGU1NzAzMmRhZjJlZGJmMjMzNiI+CjxkczpUcmFuc2Zvcm1zPgo8ZHM6VHJhbnNmb3JtIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnI2VudmVsb3BlZC1zaWduYXR1cmUiLz4KPGRzOlRyYW5zZm9ybSBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvMTAveG1sLWV4Yy1jMTRuIyIvPgo8L2RzOlRyYW5zZm9ybXM+CjxkczpEaWdlc3RNZXRob2QgQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwLzA5L3htbGRzaWcjc2hhMSIvPgo8ZHM6RGlnZXN0VmFsdWU+YlZ3WVRqRVB5WTlMajBnZ0dhSDkrR2tIM3UwPTwvZHM6RGlnZXN0VmFsdWU+CjwvZHM6UmVmZXJlbmNlPgo8L2RzOlNpZ25lZEluZm8+CjxkczpTaWduYXR1cmVWYWx1ZT4KVGgxdUo4Z3MzSXQxeDFGYlZKMUtIQnlGMWpWak55QytKdjBnN3RJcWI0dGxXYlNGQWlDMzl5RFZzK2t6RU5mc05GaEZTTE8vMEJsRwpHQm8wSHpMd3dEaVU3RHBTMUhXK2FidnUzakdsK1ZrZ0RQaExYalJWNkJ1SzZnRkRnZHlhUGRyU1pYWGhjbXhKYXBsZ3k5SkxNVEgrCndCRXZxLytKRldZQjVsam12TmVEblFDYmFKUWJvM0VxQXVZV3VOSGQ2TDlDaE1NRm5wYVZwMDFlYzNUOHJMU2g3SWFRYks5WTdrTXMKRHh6eWhuc1Z2Y0ZhdDV5VXR3NjJTcUpLWXBoemx5dGFpbU5kbU1GeGhuRE5EYWo1L0pSYUZ2VjlsS0pVNlRvNEhYaGZkR2g3WXBVTQovZUNRWjBZYmtHVFFWVG13NHhZdE9IN1hsTXhodmgrM05VTW5Gdz09CjwvZHM6U2lnbmF0dXJlVmFsdWU+CjxkczpLZXlJbmZvPjxkczpYNTA5RGF0YT48ZHM6WDUwOUNlcnRpZmljYXRlPk1JSURTVENDQWpHZ0F3SUJBZ0lFQW9MUS9UQU5CZ2txaGtpRzl3MEJBUXNGQURCVk1Rc3dDUVlEVlFRR0V3SlZVekVMTUFrR0ExVUUKQ0JNQ1EwRXhGakFVQmdOVkJBY1REVTF2ZFc1MFlXbHVJRlpwWlhjeERUQUxCZ05WQkFvVEJGZFRUekl4RWpBUUJnTlZCQU1UQ1d4dgpZMkZzYUc5emREQWVGdzB4TnpBM01Ua3dOalV5TlRGYUZ3MHlOekEzTVRjd05qVXlOVEZhTUZVeEN6QUpCZ05WQkFZVEFsVlRNUXN3CkNRWURWUVFJRXdKRFFURVdNQlFHQTFVRUJ4TU5UVzkxYm5SaGFXNGdWbWxsZHpFTk1Bc0dBMVVFQ2hNRVYxTlBNakVTTUJBR0ExVUUKQXhNSmJHOWpZV3hvYjNOME1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBbHVaRmRXMXluaXR6dGtXTApDNnhLZWdiUld4a3krNVAwcDRTaFlFT2tIczMwUUkyVkN1UjZRbzRCejVyVGdMQnJreTAzVzFHQVZyWnh1dktSR2o5VjkrUG1qZEd0CmF1NENUWHU5cExMY3FucnVhY3pvU2R2QllBM2xTOWE3emdGVTArczZrTWwyRWhCK3JrN2dYbHVFZXA3bElPZW56ZmwyZjZJb1RLYTIKZlZnVmQzWUtpU0dzeUw0dHp0Uzcwdm1tWDEyMXFtMHNUSmRLV1A0SHhYeXFLOW5lb2xYSTlmWXlIT1lJTFZOWjY5ei83M09PVmhraAovbXZUbVdaTE03R002c0FwbXlMWDZPWFVwOHowcGtZK3ZULzkrelJ4eFFzN0d1ckM0L0MxbkszckkvMHlTVWdHRWFmTzFhdE5qWW1sCkZOK00zdFpYNm5FY0E2Zzk0SWF2eVFJREFRQUJveUV3SHpBZEJnTlZIUTRFRmdRVXRTOGtJWXhROFVWdlZyWlNkZ3lpZGU5T0h4VXcKRFFZSktvWklodmNOQVFFTEJRQURnZ0VCQUJmazVtcXNWVXJwRkNZVFpaaE94VFJScEdYcW9XMUcwNWJPeEh4czQyUGF4dzhyQUowNgpQdHk5anFNMUNnUlBwcXZaYTJsUFFCUXFackhrZERFMDZxNE5HMERxTUg4TlQrdE5rWEJlOVlUcmUzRUpDU2ZzdnN3dExWRFo3R0R2ClRIS29qSmpRdmRWQ3pSajZYSDVUcnV3ZWZiNEJKejlBUHRubHlKSXZqSGsxaGRvenF5T25pVlpkMFFPeExBYmNkdDk0NmNoTmRRdkMKbTZhVU9wdXRwOFhvZ3IwS0JuRXkzVThlczJjQWZOWmFFa1BVOFZhNWJVNlhqbnk4ekdRblhDWHhQS3A3c01wZ085M25QQnQvbGlYMQpxZnlYTTd4RW90V294bW02SFp4OG9XUThVNWFpWGpaNVJLRFdDQ3E0WnVYbDZ3VnNVejFpRTYxc3VPNXlXaTg9PC9kczpYNTA5Q2VydGlmaWNhdGU+PC9kczpYNTA5RGF0YT48L2RzOktleUluZm8+PC9kczpTaWduYXR1cmU+PHNhbWwycDpTdGF0dXM+PHNhbWwycDpTdGF0dXNDb2RlIFZhbHVlPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6c3RhdHVzOlN1Y2Nlc3MiLz48L3NhbWwycDpTdGF0dXM+PHNhbWwyOkFzc2VydGlvbiBJRD0iXzI1OGQ4MTU4MzNjMjQ4N2FlMmNmYmE5OGQ1MjEyNGQ1IiBJc3N1ZUluc3RhbnQ9IjIwMTgtMTEtMTRUMTg6MzQ6NTEuODA2WiIgVmVyc2lvbj0iMi4wIiB4bWxuczpzYW1sMj0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFzc2VydGlvbiI+PHNhbWwyOklzc3VlciBGb3JtYXQ9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpuYW1laWQtZm9ybWF0OmVudGl0eSI+bG9jYWxob3N0PC9zYW1sMjpJc3N1ZXI+PGRzOlNpZ25hdHVyZSB4bWxuczpkcz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnIyI+CjxkczpTaWduZWRJbmZvPgo8ZHM6Q2Fub25pY2FsaXphdGlvbk1ldGhvZCBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvMTAveG1sLWV4Yy1jMTRuIyIvPgo8ZHM6U2lnbmF0dXJlTWV0aG9kIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnI3JzYS1zaGExIi8+CjxkczpSZWZlcmVuY2UgVVJJPSIjXzI1OGQ4MTU4MzNjMjQ4N2FlMmNmYmE5OGQ1MjEyNGQ1Ij4KPGRzOlRyYW5zZm9ybXM+CjxkczpUcmFuc2Zvcm0gQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwLzA5L3htbGRzaWcjZW52ZWxvcGVkLXNpZ25hdHVyZSIvPgo8ZHM6VHJhbnNmb3JtIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS8xMC94bWwtZXhjLWMxNG4jIi8+CjwvZHM6VHJhbnNmb3Jtcz4KPGRzOkRpZ2VzdE1ldGhvZCBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyNzaGExIi8+CjxkczpEaWdlc3RWYWx1ZT5RQnd1dHQ2QkVJY05EK3Y4bXVrNFg3NS9DMms9PC9kczpEaWdlc3RWYWx1ZT4KPC9kczpSZWZlcmVuY2U+CjwvZHM6U2lnbmVkSW5mbz4KPGRzOlNpZ25hdHVyZVZhbHVlPgpLRTdFanpUeFdxWUJnTkZFNE9ZVC80a3JTalVTbVlucDl4NGdQcktjT1FDUVIzTmRpdzl0VU5CZXBvWVpvTWdBRkM2NC9WamZjVVZOCmpESkQwSmZQSU5oQ29vMEdObHBYK0w0cTBpb2w2czl3S3BQTXdXVmF0aENtcSswcGhEc1BZbjZJbGxwT3pJQ1d0cE1YRmhmUWtqclgKdmMxaHFpRjY3d1NkMEd6ajZFbjJiRG9NM3dueEI0VVAzTkhVQkt3S21MT3VacUtLRmxCMGg0TjkrK1hvaFRXZXh5cG9kWFRtQSs4UQo1eDNmYmRrbzVUMTA4MXNSQnJxQ1Naa3NwT2ducXVZd1JRdThiOHBNcmVGeWdLdHA3TWlRdUR1b00yM1hzK21JNC9VaEducVhTYm9KCnFpYmxiMUE5Z1hNZ3Vzb0F5L1hQRTNaZndQQXpnc3dFekxLSUx3PT0KPC9kczpTaWduYXR1cmVWYWx1ZT4KPGRzOktleUluZm8+PGRzOlg1MDlEYXRhPjxkczpYNTA5Q2VydGlmaWNhdGU+TUlJRFNUQ0NBakdnQXdJQkFnSUVBb0xRL1RBTkJna3Foa2lHOXcwQkFRc0ZBREJWTVFzd0NRWURWUVFHRXdKVlV6RUxNQWtHQTFVRQpDQk1DUTBFeEZqQVVCZ05WQkFjVERVMXZkVzUwWVdsdUlGWnBaWGN4RFRBTEJnTlZCQW9UQkZkVFR6SXhFakFRQmdOVkJBTVRDV3h2ClkyRnNhRzl6ZERBZUZ3MHhOekEzTVRrd05qVXlOVEZhRncweU56QTNNVGN3TmpVeU5URmFNRlV4Q3pBSkJnTlZCQVlUQWxWVE1Rc3cKQ1FZRFZRUUlFd0pEUVRFV01CUUdBMVVFQnhNTlRXOTFiblJoYVc0Z1ZtbGxkekVOTUFzR0ExVUVDaE1FVjFOUE1qRVNNQkFHQTFVRQpBeE1KYkc5allXeG9iM04wTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFsdVpGZFcxeW5pdHp0a1dMCkM2eEtlZ2JSV3hreSs1UDBwNFNoWUVPa0hzMzBRSTJWQ3VSNlFvNEJ6NXJUZ0xCcmt5MDNXMUdBVnJaeHV2S1JHajlWOStQbWpkR3QKYXU0Q1RYdTlwTExjcW5ydWFjem9TZHZCWUEzbFM5YTd6Z0ZVMCtzNmtNbDJFaEIrcms3Z1hsdUVlcDdsSU9lbnpmbDJmNklvVEthMgpmVmdWZDNZS2lTR3N5TDR0enRTNzB2bW1YMTIxcW0wc1RKZEtXUDRIeFh5cUs5bmVvbFhJOWZZeUhPWUlMVk5aNjl6LzczT09WaGtoCi9tdlRtV1pMTTdHTTZzQXBteUxYNk9YVXA4ejBwa1krdlQvOSt6Unh4UXM3R3VyQzQvQzFuSzNySS8weVNVZ0dFYWZPMWF0TmpZbWwKRk4rTTN0Wlg2bkVjQTZnOTRJYXZ5UUlEQVFBQm95RXdIekFkQmdOVkhRNEVGZ1FVdFM4a0lZeFE4VVZ2VnJaU2RneWlkZTlPSHhVdwpEUVlKS29aSWh2Y05BUUVMQlFBRGdnRUJBQmZrNW1xc1ZVcnBGQ1lUWlpoT3hUUlJwR1hxb1cxRzA1Yk94SHhzNDJQYXh3OHJBSjA2ClB0eTlqcU0xQ2dSUHBxdlphMmxQUUJRcVpySGtkREUwNnE0TkcwRHFNSDhOVCt0TmtYQmU5WVRyZTNFSkNTZnN2c3d0TFZEWjdHRHYKVEhLb2pKalF2ZFZDelJqNlhINVRydXdlZmI0Qkp6OUFQdG5seUpJdmpIazFoZG96cXlPbmlWWmQwUU94TEFiY2R0OTQ2Y2hOZFF2QwptNmFVT3B1dHA4WG9ncjBLQm5FeTNVOGVzMmNBZk5aYUVrUFU4VmE1YlU2WGpueTh6R1FuWENYeFBLcDdzTXBnTzkzblBCdC9saVgxCnFmeVhNN3hFb3RXb3htbTZIWng4b1dROFU1YWlYalo1UktEV0NDcTRadVhsNndWc1V6MWlFNjFzdU81eVdpOD08L2RzOlg1MDlDZXJ0aWZpY2F0ZT48L2RzOlg1MDlEYXRhPjwvZHM6S2V5SW5mbz48L2RzOlNpZ25hdHVyZT48c2FtbDI6U3ViamVjdD48c2FtbDI6TmFtZUlEIEZvcm1hdD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6MS4xOm5hbWVpZC1mb3JtYXQ6ZW1haWxBZGRyZXNzIj5hZG1pbjwvc2FtbDI6TmFtZUlEPjxzYW1sMjpTdWJqZWN0Q29uZmlybWF0aW9uIE1ldGhvZD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmNtOmJlYXJlciI+PHNhbWwyOlN1YmplY3RDb25maXJtYXRpb25EYXRhIEluUmVzcG9uc2VUbz0iXzczYzU0Y2U0LWI0YjEtNDY5Yi03NTRmLTIzYzE0Mjg0ZWMyZCIgTm90T25PckFmdGVyPSIyMDE4LTExLTE0VDE4OjM5OjUxLjgwNloiIFJlY2lwaWVudD0iaHR0cDovL2xvY2FsaG9zdDozMDAwL2F1dGgvc2FtbC9jYWxsYmFjayIvPjwvc2FtbDI6U3ViamVjdENvbmZpcm1hdGlvbj48L3NhbWwyOlN1YmplY3Q+PHNhbWwyOkNvbmRpdGlvbnMgTm90QmVmb3JlPSIyMDE4LTExLTE0VDE4OjM0OjUxLjgwNloiIE5vdE9uT3JBZnRlcj0iMjAxOC0xMS0xNFQxODozOTo1MS44MDZaIj48c2FtbDI6QXVkaWVuY2VSZXN0cmljdGlvbj48c2FtbDI6QXVkaWVuY2U+bG9jYWxob3N0PC9zYW1sMjpBdWRpZW5jZT48L3NhbWwyOkF1ZGllbmNlUmVzdHJpY3Rpb24+PC9zYW1sMjpDb25kaXRpb25zPjxzYW1sMjpBdXRoblN0YXRlbWVudCBBdXRobkluc3RhbnQ9IjIwMTgtMTEtMTRUMTg6MzQ6NTEuODA2WiIgU2Vzc2lvbkluZGV4PSI1NDQ4MTkzYS1jNjY2LTQ1ZWMtODlmMS1jNTkzYWIzYTA0MTAiPjxzYW1sMjpBdXRobkNvbnRleHQ+PHNhbWwyOkF1dGhuQ29udGV4dENsYXNzUmVmPnVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphYzpjbGFzc2VzOlBhc3N3b3JkPC9zYW1sMjpBdXRobkNvbnRleHRDbGFzc1JlZj48L3NhbWwyOkF1dGhuQ29udGV4dD48L3NhbWwyOkF1dGhuU3RhdGVtZW50Pjwvc2FtbDI6QXNzZXJ0aW9uPjwvc2FtbDJwOlJlc3BvbnNlPg=="

	responseType, err = service.ResponseType(encodedAuthnResponse)
	if err != nil {
		t.Fatal(err)
	}

	if responseType != api.AuthnSAMLResponseType {
		t.Fatal("Logout Response should be AuthnResponseType")
	}

	brokenResponse := "PD94bWwgdmVycg=="

	responseType, err = service.ResponseType(brokenResponse)
	if err == nil || responseType != "" {
		t.Fatal("A broken md5 should result in an error.")
	}

}
