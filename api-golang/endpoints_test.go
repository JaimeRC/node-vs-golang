package main

import (
	"api-golang/controllers"
	"bytes"
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetTests(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/test", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(controllers.GetTests)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}
}

func TestGetTestNotFound(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/test/123", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(controllers.GetTest)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusNoContent {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusNoContent)
	}
}


func TestPostTest(t *testing.T) {

	var jsonStr = []byte(`{"name":"Pepito","code":"123456"}`)

	req, err := http.NewRequest("POST", "/api/test", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(controllers.CreateTest)
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusCreated {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusCreated)
	}

	var test map[string]interface{}

	json.Unmarshal(rr.Body.Bytes(), &test)

	if test["name"] != "Pepito" {
		t.Errorf("Expected user name to be 'Pepito'. Got '%v'", test["name"])
	}

	if test["code"] != "123456" {
		t.Errorf("Expected user age to be 'pimpampum'. Got '%v'", test["code"])
	}
}

func TestGetTestFound(t *testing.T) {
	req, err := http.NewRequest("GET", "/api/test/{code}" , nil)
	if err != nil {
		t.Fatal(err)
	}
	req = mux.SetURLVars(req,map[string]string{"code":"123456"})
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(controllers.GetTest)
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
}



func TestPutTest(t *testing.T){

	var jsonStr = []byte(`{"name":"Changes"}`)

	req, err := http.NewRequest("PUT", "/api/test/{code}", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatal(err)
	}
	req = mux.SetURLVars(req,map[string]string{"code":"123456"})
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(controllers.UpdateTest)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	var test map[string]interface{}

	json.Unmarshal(rr.Body.Bytes(), &test)

	if test["name"] != "Changes" {
		t.Errorf("Expected user name to be 'Changes'. Got '%v'", test["name"])
	}
}

func TestDeleteTest(t *testing.T){
	req, err := http.NewRequest("DELETE", "/api/test/{code}", nil)
	if err != nil {
		t.Fatal(err)
	}
	req = mux.SetURLVars(req,map[string]string{"code":"123456"})
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(controllers.DeleteTest)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
}


