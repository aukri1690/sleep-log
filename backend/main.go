package main

import (
	"log"
	"net/http"
)

func main() {
	ConnectDB()
	http.HandleFunc("/api/sleep-log", HandleSleepLog)
	log.Println("サーバー起動中: http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
