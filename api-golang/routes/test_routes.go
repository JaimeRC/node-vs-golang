package routes

import (
	"api-golang/controllers"
	"github.com/gorilla/mux"
)

func SetBooksRoutes(r *mux.Router) {

	subRouter := r.PathPrefix("/api").Subrouter()

	// Route handles & endpoints
	subRouter.HandleFunc("/test", controllers.GetTests).Methods("GET")
	subRouter.HandleFunc("/test/{id}", controllers.GetTest).Methods("GET")
	subRouter.HandleFunc("/test", controllers.CreateTest).Methods("POST")
	subRouter.HandleFunc("/test/{id}", controllers.UpdateTest).Methods("PUT")
	subRouter.HandleFunc("/test/{id}", controllers.DeleteTest).Methods("DELETE")
}