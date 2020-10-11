package routes

import (
	//_ "api-golang/docs"
	"github.com/gorilla/mux"
	"net/http"
)

func SetSwaggerRoutes(r *mux.Router) {

	subRouter := r.PathPrefix("/docs").Subrouter()

	subRouter.Handle("/swagger.yaml",http.FileServer(http.Dir("../docs")))

}



