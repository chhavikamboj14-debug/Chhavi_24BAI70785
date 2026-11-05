import { http, HttpResponse } from "msw";

const mockEvents = [
  {
    id: 1,
    title: "Design review",
    category: "Meeting",
    day: "Mon",
  },
  {
    id: 2,
    title: "Ship v2.3",
    category: "Deadline",
    day: "Tue",
  },
  {
    id: 3,
    title: "1:1 with Sam",
    category: "Meeting",
    day: "Wed",
  },
  {
    id: 4,
    title: "Write proposal",
    category: "Focus block",
    day: "Thu",
  },
  {
    id: 5,
    title: "Sprint planning",
    category: "Meeting",
    day: "Fri",
  },
  {
    id: 6,
    title: "Client demo",
    category: "Meeting",
    day: "Sat",
  },
  {
    id: 7,
    title: "Grocery run",
    category: "Personal",
    day: "Sun",
  },
  {
    id: 8,
    title: "Portfolio review",
    category: "Focus block",
    day: "Mon",
  },
];

export const handlers = [
  http.get("/api/events", () => {
    return HttpResponse.json(mockEvents);
  }),
];