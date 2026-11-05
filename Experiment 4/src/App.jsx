import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./App.css";
import { getEvents } from "./api/eventsApi";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const defaultEvents = [
  { id: 1, title: "Design review", category: "Meeting", day: "Mon" },
  { id: 2, title: "Ship v2.3", category: "Deadline", day: "Tue" },
  { id: 3, title: "1:1 with Sam", category: "Meeting", day: "Wed" },
  { id: 4, title: "Write proposal", category: "Focus block", day: "Thu" },
  { id: 5, title: "Sprint planning", category: "Meeting", day: "Fri" },
  { id: 6, title: "Client demo", category: "Meeting", day: "Sat" },
  { id: 7, title: "Grocery run", category: "Personal", day: "Sun" },
  { id: 8, title: "Portfolio review", category: "Focus block", day: "Mon" },
];

function EventCard({ event, callbackEnabled, onDragStart }) {
  return (
    <div
      className={`event-card ${event.category
        .toLowerCase()
        .replace(" ", "-")}`}
      draggable
      onDragStart={(e) => onDragStart(e, event.id)}
      data-testid={`event-${event.id}`}
    >
      <div className="event-title">{event.title}</div>
      <div className="event-category">{event.category}</div>
    </div>
  );
}

const MemoEventCard = memo(EventCard);

function App() {
  const [events, setEvents] = useState(defaultEvents);
  const [selectedDay, setSelectedDay] = useState("Mon");

  const [memoEnabled, setMemoEnabled] = useState(true);
  const [callbackEnabled, setCallbackEnabled] = useState(true);
  const [memoFilterEnabled, setMemoFilterEnabled] = useState(true);
  const [liveClock, setLiveClock] = useState(true);

  const [clock, setClock] = useState(new Date());
  const [totalRenders, setTotalRenders] = useState(0);

  const totalRendersRef = useRef(0);
  const cardRenderCountsRef = useRef({});

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  totalRendersRef.current += 1;

  useEffect(() => {
    let active = true;

    async function loadEvents() {
      try {
        setLoading(true);
        setApiError("");

        const data = await getEvents();

        if (active) {
          setEvents(data);
        }
      } catch (error) {
        console.error("API request failed:", error);

        if (active) {
          setApiError("API unavailable — showing default events.");
          setEvents(defaultEvents);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadEvents();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!liveClock) {
      return undefined;
    }

    const interval = setInterval(() => {
      setClock(new Date());
      setTotalRenders((count) => count + 1);
    }, 450);

    return () => clearInterval(interval);
  }, [liveClock]);

  const handleDragStart = useCallback((event, eventId) => {
    event.dataTransfer.setData("eventId", String(eventId));
  }, []);

  const handleDrop = useCallback((event, day) => {
    event.preventDefault();

    const eventId = Number(event.dataTransfer.getData("eventId"));

    setEvents((currentEvents) =>
      currentEvents.map((item) =>
        item.id === eventId ? { ...item, day } : item
      )
    );
  }, []);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  const agendaEvents = memoFilterEnabled
    ? useMemo(
        () =>
          events.filter(
            (event) => event.day === selectedDay
          ),
        [events, selectedDay]
      )
    : events.filter(
        (event) => event.day === selectedDay
      );

  const resetCounters = () => {
    totalRendersRef.current = 0;
    cardRenderCountsRef.current = {};
    setTotalRenders(0);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="eyebrow">
          UNIT 1 · EXPERIMENT 4 · LIVE DEMO
        </div>

        <h1>Interactive Calendar</h1>

        <p>
          Drag events between days and toggle optimization
          techniques to observe React rendering behavior.
        </p>
      </header>

      <section className="controls">
        <div className="control">
          <div>
            <strong>React.memo on cards</strong>
            <span>
              Skip a card's re-render when its own props
              haven't changed.
            </span>
          </div>

          <button
            className={`switch ${
              memoEnabled ? "active" : ""
            }`}
            onClick={() =>
              setMemoEnabled((value) => !value)
            }
            aria-label="React.memo on cards"
            aria-pressed={memoEnabled}
          >
            <span className="switch-knob" />
            <b>{memoEnabled ? "ON" : "OFF"}</b>
          </button>
        </div>

        <div className="control">
          <div>
            <strong>useCallback for handlers</strong>
            <span>
              Keep drag handlers referentially stable so
              memo isn't fooled.
            </span>
          </div>

          <button
            className={`switch ${
              callbackEnabled ? "active" : ""
            }`}
            onClick={() =>
              setCallbackEnabled((value) => !value)
            }
            aria-label="useCallback for handlers"
            aria-pressed={callbackEnabled}
          >
            <span className="switch-knob" />
            <b>{callbackEnabled ? "ON" : "OFF"}</b>
          </button>
        </div>

        <div className="control">
          <div>
            <strong>useMemo for agenda filter</strong>
            <span>
              Cache the filtered list; recompute only when
              events or day change.
            </span>
          </div>

          <button
            className={`switch ${
              memoFilterEnabled ? "active" : ""
            }`}
            onClick={() =>
              setMemoFilterEnabled((value) => !value)
            }
            aria-label="useMemo for agenda filter"
            aria-pressed={memoFilterEnabled}
          >
            <span className="switch-knob" />
            <b>{memoFilterEnabled ? "ON" : "OFF"}</b>
          </button>
        </div>

        <div className="control">
          <div>
            <strong>Live clock</strong>
            <span>
              Ticks about every ~450ms to simulate unrelated
              state elsewhere.
            </span>
          </div>

          <button
            className={`switch ${
              liveClock ? "active" : ""
            }`}
            onClick={() =>
              setLiveClock((value) => !value)
            }
            aria-label="Live clock"
            aria-pressed={liveClock}
          >
            <span className="switch-knob" />
            <b>{liveClock ? "ON" : "OFF"}</b>
          </button>
        </div>
      </section>

      <div className="toolbar">
        <button
          className="reset-button"
          onClick={resetCounters}
        >
          Reset counters
        </button>

        {liveClock && (
          <div className="clock">
            {clock.toLocaleTimeString()}
          </div>
        )}
      </div>

      {loading && (
        <div className="status-message">
          Loading events from API...
        </div>
      )}

      {apiError && (
        <div className="status-message warning">
          {apiError}
        </div>
      )}

      <main className="dashboard">
        <section className="calendar-section">
          <div className="section-heading">
            <h2>Week view</h2>
            <span>Drag &amp; drop events</span>
          </div>

          <div className="calendar">
            {days.map((day) => {
              const dayEvents = events.filter(
                (event) => event.day === day
              );

              return (
                <div
                  className={`day-column ${
                    selectedDay === day ? "selected" : ""
                  }`}
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  onDragOver={handleDragOver}
                  onDrop={(event) =>
                    handleDrop(event, day)
                  }
                  data-testid={`day-${day}`}
                >
                  <div className="day-header">{day}</div>

                  <div className="day-events">
                    {dayEvents.map((event) => {
                      cardRenderCountsRef.current[event.id] =
                        (cardRenderCountsRef.current[event.id] || 0) + 1;

                      const CardComponent = memoEnabled
                        ? MemoEventCard
                        : EventCard;

                      return (
                        <CardComponent
                          key={event.id}
                          event={event}
                          callbackEnabled={callbackEnabled}
                          onDragStart={handleDragStart}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="agenda">
            <div className="section-heading">
              <h2>{selectedDay} agenda</h2>
              <span>
                {agendaEvents.length} events
              </span>
            </div>

            <div className="agenda-list">
              {agendaEvents.map((event) => (
                <div
                  className="agenda-item"
                  key={event.id}
                >
                  <span>{event.title}</span>
                  <small>{event.category}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="monitor">
          <div className="monitor-title">
            <span>RENDER MONITOR</span>
            <span className="live-dot">●</span>
          </div>

          <div className="metric">
            <span>Total renders</span>
            <strong>{totalRenders}</strong>
          </div>

          <div className="metric">
            <span>Cards rendered</span>
            <strong>
              {Object.values(
                cardRenderCountsRef.current
              ).reduce(
                (sum, value) => sum + value,
                0
              )}
            </strong>
          </div>

          <div className="render-list">
            <h3>Per-event renders</h3>

            {events.map((event) => (
              <div
                className="render-row"
                key={event.id}
              >
                <span>{event.title}</span>

                <strong>
                  {cardRenderCountsRef.current[event.id] || 0}
                </strong>
              </div>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;