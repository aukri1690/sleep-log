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
  const [date, setDate] = React.useState<Date>();
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-60">
        <CardContent className="flex flex-col gap-5 pt-6 px-4 pb-6">
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="date">記録日</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!date}
                  className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                >
                  <span>{date ? format(date, "PPP") : "日付を選択"}</span>
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  defaultMonth={date}
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
              defaultValue="23:00:00"
              className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="waketime">起床時刻</Label>
            <Input
              type="time"
              id="waketime"
              step="1"
              defaultValue="07:00:00"
              className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            記録
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default InputTimeCard;
