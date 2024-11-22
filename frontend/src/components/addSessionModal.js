import { useState, useEffect } from 'react';
import styles from '@/styles/addSessionModal.module.css';

export default function SessionModal({ isOpen, onClose, onAdd, plans }) {
    const [sessionName, setSessionName] = useState('');
    const [notes, setNotes] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [breakTime, setBreakTime] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(''); // To store the selected date
    const [plan, setPlan] = useState(''); // To store the selected plan
    const [selectedPlan, setSelectedPlan] = useState('');
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        if (selectedPlan) {
          const plan = plans.find((plan) => plan.name === selectedPlan);
          setTopics(plan ? plan.topics : []);
        }
    }, [selectedPlan, plans]); // Always call this useEffect for each render

    // Reset all input fields when the modal is closed
    const handleClose = () => {
        setSessionName('');
        setNotes('');
        setDate('');
        setPlan('');
        setSelectedTopics([]);
        setSelectedPlan('');
        setTopics([]);
        setStartTime('');
        setEndTime('');
        setBreakTime('');
        setDuration(0);
        onClose();
    };

    const handleAdd = () => {
        onAdd({ name: sessionName, notes, duration, date, plan, startTime, endTime, breakTime, duration, selectedTopics });
        handleClose();
    };

    // Calculate duration when inputs change
    const calculateDuration = () => {
        if (startTime && endTime && !isNaN(breakTime)) {
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);

        const startInMinutes = startHour * 60 + startMinute;
        const endInMinutes = endHour * 60 + endMinute;
        const totalDuration = Math.max(0, endInMinutes - startInMinutes - breakTime);

        setDuration(totalDuration);
        } else {
        setDuration(0); // Reset if input is invalid
        }
    };

    // Update duration on input change
    const handleStartTimeChange = (e) => {
        setStartTime(e.target.value);
        calculateDuration();
    };

    const handleEndTimeChange = (e) => {
        setEndTime(e.target.value);
        calculateDuration();
    };

    const handleBreakTimeChange = (e) => {
        const value = parseInt(e.target.value, 10) || 0; // Default to 0 if invalid
        setBreakTime(value);
        calculateDuration();
    };

    const handleTopicChange = (topic) => {
        setSelectedTopics((prev) =>
            prev.includes(topic)
            ? prev.filter((t) => t !== topic) // Uncheck if already selected
            : [...prev, topic] // Add if not selected
        );
    };

    if (!isOpen) return null; // Do not render if modal is closed

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={handleClose} aria-label="Close">
                    &times;
                </button>

                <h2 className={styles.title}>Create New Session</h2>
  
                <div className={styles.entry}>
                    {/* Session Name */}
                    <label htmlFor="sessionName" className={styles.label}>Session Name</label>
                    <input
                        id="sessionName"
                        type="text"
                        placeholder="Enter session name"
                        value={sessionName}
                        onChange={(e) => setSessionName(e.target.value)}
                        className={styles.inputBox}
                    />
                </div>                

                <div className={styles.entry}>
                    {/* Date Selection */}
                    <label htmlFor="date" className={styles.label}>Date</label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className={styles.inputBox}
                    />
                </div>

                <div className={styles.entry}>
                    {/* Plan Selection */}
                    <label className={styles.label} htmlFor="plan">Select Plan</label>
                    <select
                    id="plan"
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className={styles.inputBox}
                    >
                    <option value="">Select a Plan</option>
                    {plans.map((plan) => (
                        <option key={plan.name} value={plan.name}>{plan.name}</option>
                    ))}
                    </select>
                </div>

                <div className={styles.entry}>
                    {/* Topics Selection */}
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

                <div className={styles.entryDuration}>
                    {/* Duration */}
                    <label className={styles.label} htmlFor="startTime">Start Time</label>
                    <input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={handleStartTimeChange}
                    className={styles.inputBox}
                    />

                    <label className={styles.label} htmlFor="endTime">End Time</label>
                    <input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={handleEndTimeChange}
                    className={styles.inputBox}
                    />
                </div>

                <div className={styles.entryDuration}>
                    <label className={styles.label} htmlFor="breakTime">Total Breaks (minutes)</label>
                    <input
                    id="breakTime"
                    type="number"
                    value={breakTime}
                    onChange={handleBreakTimeChange}
                    className={styles.inputBox}
                    />

                    <p className={styles.durationDisplay}>
                    Duration: {duration > 0 ? `${Math.floor(duration / 60)}h ${duration % 60}m` : 'N/A'}
                    </p>
                </div>

                <div className={styles.entry}>
                    {/* Notes */}
                    <label htmlFor="notes" className={styles.label}>Notes</label>
                    <textarea
                        id="notes"
                        placeholder="Add any notes here"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className={styles.textareaBox}
                    />
                </div>

                <button onClick={handleAdd} className={styles.button}>Add Session</button>
            </div>
        </div>
    );
}
