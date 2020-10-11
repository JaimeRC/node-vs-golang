package controllers

import (
	"api-golang/models"
	"encoding/json"
	"github.com/gorilla/mux"
	"math/rand"
	"net/http"
	"strconv"
)

// Init Tests var as a slice Test struct
var tests []models.Test

// Get all Tests
func GetTests(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tests)
}

// Get single Test
func GetTest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r) // Gets params
	// Loop through tests and find one with the id from the params
	for _, item := range tests {
		if item.ID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
	json.NewEncoder(w).Encode(&models.Test{})
}

// Add new Test
func CreateTest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var test models.Test
	_ = json.NewDecoder(r.Body).Decode(&test)
	test.ID = strconv.Itoa(rand.Intn(100000000)) // Mock ID - not safe
	tests = append(tests, test)
	json.NewEncoder(w).Encode(test)
}

// Update Test
func UpdateTest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, item := range tests {
		if item.ID == params["id"] {
			tests = append(tests[:index], tests[index+1:]...) // Remove test
			var test models.Test
			_ = json.NewDecoder(r.Body).Decode(&test)
			test.ID = params["id"]
			tests = append(tests, test) // Add test updated
			json.NewEncoder(w).Encode(test)
			return
		}
	}
}

// Delete Test
func DeleteTest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, item := range tests {
		if item.ID == params["id"] {
			tests = append(tests[:index], tests[index+1:]...) // Remove book
			break
		}
	}
	json.NewEncoder(w).Encode(tests)
}