package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

func ConnectDB() {
	// dsn(Data Source Name)
	// データベースへの接続に必要な情報
	dsn := "host=localhost port=5432 user=postgres password=sleep-log dbname=postgres sslmode=disable"

	// データベースに接続するための準備
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		log.Fatal(err)
	}

	// データベースに接続できるかテスト
	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	rows, err := db.Query("SELECT * FROM sleeps")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("成功！")

	defer rows.Close()
}