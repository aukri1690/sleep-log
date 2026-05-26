package main

import (
	"backend/database"
	"backend/handler"
	"log"
	"net/http"
)

func main() {
	database.ConnectDB()
	http.HandleFunc("/api/sleep-log", handler.HandleSleepLog)
	log.Println("サーバー起動中: http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
