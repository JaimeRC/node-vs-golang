package routes

import (
	"api-golang/controllers"
	"github.com/gorilla/mux"
)

func SetTestRoutes(r *mux.Router) {

	subRouter := r.PathPrefix("/api").Subrouter()

	// Route handles & endpoints
	subRouter.HandleFunc("/test", controllers.GetTests).Methods("GET")
	subRouter.HandleFunc("/test/{code}", controllers.GetTest).Methods("GET")
	subRouter.HandleFunc("/test", controllers.CreateTest).Methods("POST")
	subRouter.HandleFunc("/test/{code}", controllers.UpdateTest).Methods("PUT")
	subRouter.HandleFunc("/test/{code}", controllers.DeleteTest).Methods("DELETE")
}