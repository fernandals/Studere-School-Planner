import { useState, useEffect } from 'react';
import styles from '@/styles/sessionModal.module.css';

export default function SessionModal({ isOpen, onClose, onAdd, onEdit, session, plans }) {
    const [sessionTitle, setSessionName] = useState('');
    const [notes, setNotes] = useState('');
    const [startedAt, setStartedAt] = useState('');
    const [endedAt, setEndedAt] = useState('');
    const [pauseTime, setPauseTime] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState('');
    const [selectedPlan, setSelectedPlan] = useState('');
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [topics, setTopics] = useState([]);
    const [startTime, setStartTime] = useState(''); // Time portion only
    const [endTime, setEndTime] = useState('');

    useEffect(() => {
        if (session) {
            // Extract start time
            const start = new Date(session.startedAt);
            const startTime = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        
            // Extract end time
            const end = new Date(session.endedAt);
            const endTime = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        
            // Extract date (assuming startedAt determines the date)
            const sessionDate = start.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        
            // Calculate duration excluding pauses
            const pauseDuration = session.pauseTime || 0; // Assume pauseTime is in milliseconds
            const totalDuration = (end.getTime() - start.getTime() - pauseDuration) / (1000 * 60); // Duration in minutes
        
            // Set states
            setSessionName(session.title || '');
            setNotes(session.notes || '');
            setStartedAt(session.startedAt || '');
            setStartTime(startTime); // For time input
            setEndedAt(session.endedAt || '');
            setEndTime(endTime); // For time input
            setPauseTime(session.pauseTime || '');
            setDuration(totalDuration > 0 ? totalDuration : 0); // Avoid negative duration
            setDate(sessionDate); // For date input
            setSelectedPlan(session.plan || '');
            setSelectedTopics(session.selectedTopics || []);
        }
    }, [session]);
      
    

  useEffect(() => {
    if (selectedPlan) {
      const plan = plans.find((plan) => plan.title === selectedPlan);
      setTopics(plan ? plan.topics : []);
    }
  }, [selectedPlan, plans]);

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setSessionName('');
    setNotes('');
    setStartedAt('');
    setEndedAt('');
    setPauseTime('');
    setDuration(0);
    setDate('');
    setSelectedPlan('');
    setSelectedTopics([]);
    setTopics([]);
  };

  const handleAdd = () => {
    const newSession = {
      title: sessionTitle,
      notes,
      duration,
      date,
      plan: selectedPlan,
      startedAt,
      endedAt,
      pauseTime,
      selectedTopics,
    };
    onAdd(newSession);
    resetForm();
    handleClose();
  };

  const handleEdit = () => {
    const updatedSession = {
      id: session.id,
      title: sessionTitle,
      notes,
      duration,
      date,
      plan: selectedPlan,
      startedAt,
      endedAt,
      pauseTime,
      selectedTopics,
    };
    onEdit(updatedSession);
    resetForm();
    handleClose();
  };

  const calculateDuration = () => {
    if (startedAt && endedAt && !isNaN(pauseTime)) {
      const [startHour, startMinute] = startedAt.split(':').map(Number);
      const [endHour, endMinute] = endedAt.split(':').map(Number);

      const startInMinutes = startHour * 60 + startMinute;
      const endInMinutes = endHour * 60 + endMinute;
      const totalDuration = Math.max(0, endInMinutes - startInMinutes - pauseTime);

      setDuration(totalDuration);
    } else {
      setDuration(0);
    }
  };

  const handleEndTimeChange = (e) => {
    setEndedAt(e.target.value);
    calculateDuration();
  };

  const handleBreakTimeChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    setPauseTime(value);
    calculateDuration();
  };

  const handleTopicChange = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  const handleStartTimeChange = (e) => {
    const newTime = e.target.value; // Format: "HH:mm"
    setStartTime(newTime);
  
    if (startedAt) {
      const date = new Date(startedAt); // Retain the existing date
      const [hours, minutes] = newTime.split(':').map(Number);
      date.setHours(hours);
      date.setMinutes(minutes);
      setStartedAt(date.toISOString()); // Update the full timestamp
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={handleClose} aria-label="Close">
          &times;
        </button>

        <h2 className={styles.title}>{session ? 'Edit Session' : 'Create New Session'}</h2>

        {/* Session Name */}
        <div className={styles.entry}>
          <label htmlFor="sessionTitle" className={styles.label}>Session Name</label>
          <input
            id="sessionTitle"
            type="text"
            placeholder="Enter session title"
            value={sessionTitle}
            onChange={(e) => setSessionName(e.target.value)}
            className={styles.inputBox}
          />
        </div>

        {/* Date */}
        <div className={styles.entry}>
          <label htmlFor="date" className={styles.label}>Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={styles.inputBox}
          />
        </div>

        {/* Plan Selection */}
        <div className={styles.entry}>
          <label className={styles.label} htmlFor="plan">Select Plan</label>
          <select
            id="plan"
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className={styles.inputBox}
          >
            <option value="">Select a Plan</option>
            {plans.map((plan) => (
              <option key={plan.title} value={plan.title}>{plan.title}</option>
            ))}
          </select>
        </div>

        {/* Topics */}
        <div className={styles.entry}>
          <label className={styles.label}>Select Topics</label>
          <div className={styles.topicBox}>
            {topics.map((topic) => (
              <label key={topic} className={styles.topicItem}>
                <input
                  type="checkbox"
                  value={topic}
                  checked={selectedTopics.includes(topic)}
                  onChange={() => handleTopicChange(topic)}
                  className={styles.checkbox}
                />
                {topic}
              </label>
            ))}
          </div>
        </div>

        {/* Time Inputs */}
        <div className={styles.entryDuration}>
          <label className={styles.label} htmlFor="startedAt">Start Time</label>
          <input
            id="startedAt"
            type="time"
            value={startedAt}
            onChange={handleStartTimeChange}
            className={styles.inputBox}
          />

          <label className={styles.label} htmlFor="endedAt">End Time</label>
          <input
            id="endedAt"
            type="time"
            value={endedAt}
            onChange={handleEndTimeChange}
            className={styles.inputBox}
          />
        </div>

        {/* Break Time */}
        <div className={styles.entryDuration}>
          <label className={styles.label} htmlFor="pauseTime">Total Breaks (minutes)</label>
          <input
            id="pauseTime"
            type="number"
            value={pauseTime}
            onChange={handleBreakTimeChange}
            className={styles.inputBox}
          />

          <p className={styles.durationDisplay}>
            Duration: {duration > 0 ? `${Math.floor(duration / 60)}h ${duration % 60}m` : 'N/A'}
          </p>
        </div>

        {/* Notes */}
        <div className={styles.entry}>
          <label htmlFor="notes" className={styles.label}>Notes</label>
          <textarea
            id="notes"
            placeholder="Add any notes here"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={styles.textareaBox}
          />
        </div>

        {/* Action Buttons */}
        <div className={styles.buttonContainer}>
          <button
            onClick={session ? handleEdit : handleAdd}
            className={styles.button}
          >
            {session ? 'Update Session' : 'Add Session'}
          </button>
        </div>
      </div>
    </div>
  );
}
