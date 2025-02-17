import { h } from 'preact';
import { useState, useRef } from 'preact/hooks';

interface CSSClockProps {
  onSelect: (selectedTime: string) => void;
}

const CSSClock = ({ onSelect }: CSSClockProps) => {
  const [hour, setHour] = useState(10);
  const [minute, setMinute] = useState(51);
  const [amPm, setAmPm] = useState<'AM' | 'PM'>('AM');
  const [mode, setMode] = useState<'hour' | 'minute'>('hour');
  const clockRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  // Calculate angle based on pointer position
  const getAngleFromEvent = (e: PointerEvent): number => {
    if (!clockRef.current) return 0;
    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    let angle = Math.atan2(y, x) * (180 / Math.PI);
    angle += 90; // Adjust so top is 0°
    if (angle < 0) angle += 360;
    return angle;
  };

  // Update time based on the angle
  const updateTimeFromAngle = (angle: number) => {
    if (mode === 'hour') {
      const rounded = Math.round(angle / 30) * 30;
      let newHour = rounded / 30;
      if (newHour === 0) newHour = 12; // Handle 12-hour format
      setHour(newHour);
    } else {
      const rounded = Math.round(angle / 6) * 6;
      let newMinute = Math.round(rounded / 6);
      if (newMinute === 60) newMinute = 0; // Correct for 60th minute
      setMinute(newMinute);
    }
  };

  const handlePointerDown = (e: h.JSX.TargetedPointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateTimeFromAngle(getAngleFromEvent(e));
  };

  const handlePointerMove = (e: h.JSX.TargetedPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateTimeFromAngle(getAngleFromEvent(e));
  };

  const handlePointerUp = (e: h.JSX.TargetedPointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  // Calculate hour and minute hand angles based on current time
  const hourAngle = ((hour % 12) + minute / 60) * 30;
  const minuteAngle = minute * 6;

  const clockSize = 260; // Size of the clock
  const radius = clockSize / 2;
  const _indicatorRadius = radius - 12; // For roulette-style indicator
  const indicatorAngle = mode === 'hour' ? hourAngle : minuteAngle;
  const _rad = (indicatorAngle - 90) * (Math.PI / 180);

  // Format and pass the selected time
  const handleSetTime = () => {
    const formattedTime = `${hour.toString().padStart(2, '0')}:${minute
      .toString()
      .padStart(2, '0')} ${amPm}`;
    onSelect(formattedTime);
  };
  

  return (
    <div
    style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      textAlign: 'center',
      maxWidth: '350px',
      height: '460px',
      margin: '0 auto',
      background: '#ffffff',
      padding: '1.5rem',
      borderRadius: '20px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    {/* Time Display */}
    <div style={{ 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.8rem',
      marginBottom: '1rem'
    }}>
      {/* Hour Box */}
      <div
        onClick={() => setMode('hour')}
        style={{
          cursor: 'pointer',
          padding: '0.8rem',
          background: mode === 'hour' ? '#2d3748' : '#f7fafc',
          borderRadius: '10px',
          border: `2px solid ${mode === 'hour' ? '#2d3748' : '#e2e8f0'}`,
          transition: 'all 0.2s',
          minWidth: '70px'
        }}
      >
        <div style={{
          fontSize: '2.5rem',
          fontWeight: '600',
          color: mode === 'hour' ? '#ffffff' : '#2d3748',
          lineHeight: 1
        }}>
          {hour.toString().padStart(2, '0')}
        </div>
      </div>

      {/* Colon Separator */}
      <div style={{ 
        fontSize: '1.8rem',
        color: '#2d3748',
        marginBottom: '1.2rem'
      }}>
        :
      </div>

      {/* Minute Box */}
      <div
        onClick={() => setMode('minute')}
        style={{
          cursor: 'pointer',
          padding: '0.8rem',
          background: mode === 'minute' ? '#2d3748' : '#f7fafc',
          borderRadius: '10px',
          border: `2px solid ${mode === 'minute' ? '#2d3748' : '#e2e8f0'}`,
          transition: 'all 0.2s',
          minWidth: '70px'
        }}
      >
        <div style={{
          fontSize: '2.5rem',
          fontWeight: '600',
          color: mode === 'minute' ? '#ffffff' : '#2d3748',
          lineHeight: 1
        }}>
          {minute.toString().padStart(2, '0')}
        </div>
      </div>

      {/* Stacked AM/PM */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginLeft: '0.8rem'
        }}
      >
        <div
          onClick={() => setAmPm('AM')}
          style={{
            cursor: 'pointer',
            padding: '0.4rem 0.8rem',
            background: amPm === 'AM' ? '#ffa500' : '#f7fafc',
            color: amPm === 'AM' ? 'white' : '#cbd5e0',
            fontWeight: '600',
            borderRadius: '6px 6px 0 0',
            border: `2px solid ${amPm === 'AM' ? '#ffa500' : '#e2e8f0'}`,
            borderBottom: 'none',
            transition: 'all 0.2s',
            fontSize: '0.9rem'
          }}
        >
          AM
        </div>
        <div
          onClick={() => setAmPm('PM')}
          style={{
            cursor: 'pointer',
            padding: '0.4rem 0.8rem',
            background: amPm === 'PM' ? '#ffa500' : '#f7fafc',
            color: amPm === 'PM' ? 'white' : '#cbd5e0',
            fontWeight: '600',
            borderRadius: '0 0 6px 6px',
            border: `2px solid ${amPm === 'PM' ? '#ffa500' : '#e2e8f0'}`,
            transition: 'all 0.2s',
            fontSize: '0.9rem'
          }}
        >
          PM
        </div>
      </div>
    </div>

    {/* Clock Face */}
    <div
      ref={clockRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        position: 'relative',
        width: clockSize + 'px',
        height: clockSize + 'px',
        margin: '0 auto',
        borderRadius: '50%',
        background: '#ffffff',
        border: '2px solid #e2e8f0',
        touchAction: 'none',
        userSelect: 'none',
        cursor: 'pointer',
        flexShrink: 0
      }}
    >
        {/* Hour Markers */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = i * 30;
          const markerSize = 12;
          const markerDistance = radius - 20;
          const x = radius + Math.cos((angle - 90) * Math.PI / 180) * markerDistance;
          const y = radius + Math.sin((angle - 90) * Math.PI / 180) * markerDistance;
          
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '2px',
                height: `${markerSize}px`,
                backgroundColor: '#2d3748',
                left: `${x}px`,
                top: `${y}px`,
                transform: `rotate(${angle}deg)`,
                transformOrigin: 'center',
              }}
            >
              {i === 0 && (
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  left: '-6px',
                  fontSize: '14px',
                  color: '#2d3748',
                  transform: `rotate(-${angle}deg)`
                }}>
                  12
                </div>
              )}
            </div>
          );
        })}

        {/* Minute Markers */}
        {Array.from({ length: 60 }).map((_, i) => {
          if (i % 5 === 0) return null; // Skip where hour markers are
          
          const angle = i * 6;
          const markerSize = 6;
          const markerDistance = radius - 20;
          const x = radius + Math.cos((angle - 90) * Math.PI / 180) * markerDistance;
          const y = radius + Math.sin((angle - 90) * Math.PI / 180) * markerDistance;
          
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '1px',
                height: `${markerSize}px`,
                backgroundColor: '#cbd5e0',
                left: `${x}px`,
                top: `${y}px`,
                transform: `rotate(${angle}deg)`,
                transformOrigin: 'center',
              }}
            />
          );
        })}

        {/* Hour Hand */}
        <div
          style={{
            position: 'absolute',
            width: '4px',
            height: '60px',
            background: '#2d3748',
            top: (clockSize / 2 - 60) + 'px',
            left: (clockSize / 2 - 2) + 'px',
            transformOrigin: 'bottom center',
            transform: `rotate(${hourAngle}deg)`,
            borderRadius: '2px',
            transition: draggingRef.current ? 'none' : 'transform 0.1s',
          }}
        />

        {/* Minute Hand */}
        <div
          style={{
            position: 'absolute',
            width: '3px',
            height: '80px',
            background: '#2d3748',
            top: (clockSize / 2 - 80) + 'px',
            left: (clockSize / 2 - 1.5) + 'px',
            transformOrigin: 'bottom center',
            transform: `rotate(${minuteAngle}deg)`,
            borderRadius: '2px',
            transition: draggingRef.current ? 'none' : 'transform 0.1s',
          }}
        />

        {/* Center Dot */}
        <div
          style={{
            position: 'absolute',
            width: '8px',
            height: '8px',
            background: '#2d3748',
            borderRadius: '50%',
            top: (clockSize / 2 - 4) + 'px',
            left: (clockSize / 2 - 4) + 'px',
          }}
        />

        {/* Indicator */}
        <div
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            background: '#ffa500',
            borderRadius: '50%',
            top: `${radius + Math.sin(_rad) * _indicatorRadius}px`,
            left: `${radius + Math.cos(_rad) * _indicatorRadius}px`,
            pointerEvents: 'none',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        />
      </div>

      {/* Set Time Button */}
        <button
          onClick={handleSetTime}
          className="set-time-button"
        >
          Set Time
        </button>
    </div>
  );
};

export default CSSClock;
