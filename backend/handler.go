package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type SleepLog struct {
	Date       string `json:"sleepDate"`
	Bedtime    string `json:"bedtime"`
	WakeUpTime string `json:"wakeUpTime"`
}

func HandleSleepLog(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var sleepLog SleepLog
	if err := json.NewDecoder(r.Body).Decode(&sleepLog); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	fmt.Printf("date: %s, bedtime: %s, wakeUpTime: %s\n",
		sleepLog.Date, sleepLog.Bedtime, sleepLog.WakeUpTime)
	
	_, err := DB.Exec(
		"INSERT INTO sleeps (sleep_date, bed_time, wake_up_time) VALUES ($1, $2, $3)",
		sleepLog.Date,
		sleepLog.Bedtime,
		sleepLog.WakeUpTime,
	)
	if err != nil {
		fmt.Println("DB保存エラー:", err)
		http.Error(w, "DB保存に失敗しました", http.StatusInternalServerError)
		return
	}
	
	w.WriteHeader(http.StatusOK)
}