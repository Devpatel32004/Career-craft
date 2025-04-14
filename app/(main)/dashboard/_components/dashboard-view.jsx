"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Brain,
  BriefcaseIcon,
  LineChart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const DashboardView = ({ insights }) => {
  const salaryRanges = insights.salaryRanges.map((item) => {
    return {
      name: item.role,
      min: item.min / 1000,
      max: item.max / 1000,
      median: item.median / 1000,
    };
  });

  const demandColor = (demand) => {
    switch (demand.toLowerCase()) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-gray-500";
      default:
        return "bg-gray-300"; // optional fallback for safety
    }
  };

  const marketOutlookColor = (Outlook) => {
    switch (Outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-green-500" };
      case "negative":
        return { icon: TrendingDown, color: "text-red-500" };
      case "neutral":
        return { icon: LineChart, color: "text-yellow-500" };
      default:
        return { icon: LineChart, color: "text-gray-500" };
    }
  };

  const OutLookIcon = marketOutlookColor(insights.marketOutlook).icon;
  const outLookColor = marketOutlookColor(insights.marketOutlook).color;

  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDate = formatDistanceToNow(new Date(insights.nextUpdate));

  console.log("last updated: ", lastUpdatedDate);
  console.log("next updated: ", nextUpdateDate);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Badge variant="outline">Last updated: {lastUpdatedDate}</Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-transparent hover:border-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Market Outlook
            </CardTitle>
            <OutLookIcon className={`h-4 w-4 ${outLookColor}`} />
          </CardHeader>
          <CardContent>
            <h2 className="font-bold text-2xl">{insights.marketOutlook}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Next update in {nextUpdateDate}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-transparent hover:border-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Demand Level</CardTitle>
            <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <h2 className="font-semibold text-2xl">{insights.demandLevel}</h2>
            <div
              className={`w-full h-2 mt-3 rounded-full ${demandColor(
                insights.demandLevel
              )}`}
            ></div>
          </CardContent>
        </Card>
        <Card className="bg-transparent hover:border-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Industry Growth
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <h2 className="font-bold text-2xl">
              {insights.growthRate.toFixed(1)}%
            </h2>
            <Progress value={insights.growthRate} className="w-full mt-3" />
          </CardContent>
        </Card>
        <Card className="bg-transparent hover:border-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold">Top Skills</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {insights.topSkills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-transparent col-span-4 w-full">
        <CardHeader className="pb-2">
          <CardTitle>
            Salary Ranges by Role
          </CardTitle>
          <CardDescription>
            Displaying minimum, median, and maximum salaries (in thousands)
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryRanges}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border rounded-lg p-2 shadow-md">
                          <p className="font-medium">{label}</p>
                          {payload.map((item) => (
                            <p key={item.name} className="text-sm">
                              {item.name}: ${item.value}K
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Bar dataKey="min" fill="#94a3b8" name="Min Salary (K)" />
                <Bar dataKey="median" fill="#64748b" name="Median Salary (K)" />
                <Bar dataKey="max" fill="#475569" name="Max Salary (K)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-transparent hover:border-primary">
          <CardHeader className="pb-2">
            <CardTitle>
              Key Industry Trends
            </CardTitle>
            <CardDescription>
              Current trends shaping the industry
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {insights.keyTrends.map((trend,index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div  className="size-2 rounded-full bg-primary"/>
                  <span>{trend}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-transparent hover:border-primary">
          <CardHeader className="pb-2">
            <CardTitle>
            Recommended Skills
            </CardTitle>
            <CardDescription>
            Skills to consider developing
            </CardDescription>
          </CardHeader>
          <CardContent>
          <div className="flex flex-wrap gap-2">
          {insights.recommendedSkills.map((skill,index) => (
            <Badge variant="secondary" key={index}>{skill}</Badge>
           ))}
          </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
