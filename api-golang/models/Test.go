package models

import "time"

type Test struct {
	ID     		string				`json:"id"`
	Name	 	string 				`json:"name"`
	Code   	 	string 				`json:"code"`
	CreatedAt 	time.Time			`json:"createdAt"`
	UpdatedAt   time.Time			`json:"updatedAt"`
}