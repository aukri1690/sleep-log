"use client";

import React from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const InputTimeCard = () => {
  const [sleepDate, setSleepDate] = React.useState<Date>();
  const [bedtime, setBedtime] = React.useState("23:00:00");
  const [wakeUpTime, setWakeUpTime] = React.useState("07:00:00");

  const handleSubmit = async () => {
    if (!sleepDate) {
      alert("日付を選択してください");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/sleep-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sleepDate: format(sleepDate, "yyyy-MM-dd"),
          bedtime,
          wakeUpTime,
        }),
      });

      if (response.ok) {
        alert("記録しました");
      } else {
        alert("送信に失敗しました");
      }
    } catch (error) {
      alert("サーバーに接続できません");
    }
  };

  return ( 
      <Card className="w-full max-w-60">
        <CardContent className="flex flex-col gap-5 pt-6 px-4 pb-6">
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="sleepDate">記録日</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!sleepDate}
                  className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                >
                  <span>{sleepDate ? format(sleepDate, "PPP") : "日付を選択"}</span>
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={sleepDate}
                  onSelect={setSleepDate}
                  defaultMonth={sleepDate}
                  weekStartsOn={1}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="bedtime">就寝時刻</Label>
            <Input
              type="time"
              id="bedtime"
              step="1"
              value={bedtime}
              onChange={(e) => setBedtime(e.target.value)}
              className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="wakeUpTime">起床時刻</Label>
            <Input
              type="time"
              id="wakeUpTime"
              step="1"
              value={wakeUpTime}
              onChange={(e) => setWakeUpTime(e.target.value)}
              className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-smarthr hover:bg-smarthr-hover text-white"
            onClick={handleSubmit}
          >
            記録
          </Button>
        </CardContent>
      </Card>
  );
};

export default InputTimeCard;