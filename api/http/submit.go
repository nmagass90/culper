package http

import (
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/admin"
)

// SubmitHandler is the handler for submitting the application. This handler is not
// used in production, but is useful in development because it returns the generated XML
// for a submission.
type SubmitHandler struct {
	Env       api.Settings
	Log       api.LogService
	Database  api.DatabaseService
	Store     api.StorageService
	Submitter admin.Submitter
}

// ServeHTTP submits the application package to the external web service for further processing.
func (service SubmitHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	// Get account ID
	id := AccountIDFromRequestContext(r)

	// Get the account information from the data store
	account := &api.Account{ID: id}
	if _, err := account.Get(service.Database, id); err != nil {
		service.Log.WarnError(api.NoAccount, err, api.LogFields{})
		RespondWithStructuredError(w, api.NoAccount, http.StatusUnauthorized)
		return
	}

	// If the account is locked then we cannot proceed
	if account.Locked {
		service.Log.Warn(api.AccountLocked, api.LogFields{})
		RespondWithStructuredError(w, api.AccountLocked, http.StatusForbidden)
		return
	}

	xml, _, submitErr := service.Submitter.FilesForSubmission(account.ID)
	if submitErr != nil {
		service.Log.WarnError(api.PdfError, submitErr, api.LogFields{})
		RespondWithStructuredError(w, api.PdfError, http.StatusInternalServerError)
		return
	}

	// Lock the account
	if err := account.Lock(service.Database); err != nil {
		service.Log.WarnError(api.AccountUpdateError, err, api.LogFields{})
		RespondWithStructuredError(w, api.AccountUpdateError, http.StatusInternalServerError)
		return
	}

	// Write the XML to the response.
	w.Header().Set("Content-Type", "application/xml")
	w.Write(xml)
}
