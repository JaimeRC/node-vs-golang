package controllers

import (
	"api-golang/models"
	"encoding/json"
	"github.com/gorilla/mux"
	"math/rand"
	"net/http"
	"strconv"
	"time"
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
	// Loop through tests and find one with the code from the params
	for _, item := range tests {
		if item.Code == params["code"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
	w.WriteHeader(http.StatusNoContent)
	json.NewEncoder(w).Encode(&models.Test{})
}

// Add new Test
func CreateTest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var test models.Test
	_ = json.NewDecoder(r.Body).Decode(&test)
	test.ID = strconv.Itoa(rand.Intn(100000000)) // Mock ID - not safe
	tests = append(tests, test)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(test)
}

// Update Test
func UpdateTest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, item := range tests {
		if item.Code == params["code"] {
			var test = tests[index]
			tests = append(tests[:index], tests[index+1:]...) // Remove test
			var updateTest models.Test
			_ = json.NewDecoder(r.Body).Decode(&updateTest)
			test.Name = updateTest.Name
			test.UpdatedAt = time.Now()
			tests = append(tests, test) // Add test updated
			json.NewEncoder(w).Encode(test)
			return
		}
	}
	w.WriteHeader(http.StatusNoContent)
	json.NewEncoder(w).Encode(&models.Test{})
}

// Delete Test
func DeleteTest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, item := range tests {
		if item.Code == params["code"] {
			tests = append(tests[:index], tests[index+1:]...) // Remove book
			json.NewEncoder(w).Encode(tests)
			return
		}
	}
	w.WriteHeader(http.StatusNoContent)
	json.NewEncoder(w).Encode(&models.Test{})
}