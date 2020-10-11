package main

import (
	"api-golang/routes"
	"github.com/gorilla/mux"
	"log"
	"net/http"
)


// Main function
func main() {

	// Init router
	r := mux.NewRouter()

	// Add Routes
	routes.SetTestRoutes(r)
	routes.SetHealthCheckRoutes(r)

	// Create Server
	srv := http.Server{
		Addr:    ":8080",
		Handler: r,
	}

	log.Println("Running on port 8080")

	// Run Server
	log.Println(srv.ListenAndServe())
}