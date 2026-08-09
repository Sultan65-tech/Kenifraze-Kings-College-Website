import React from 'react';
import { IoSettingsSharp } from 'react-icons/io5';

export default function GearChain() {
  return (
    <>
      {/* 1. Injecting Global Keyframes for CSS-in-JS Animation */}
      <style>
        {`
          @keyframes spinClockwise {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes spinCounterClockwise {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
        `}
      </style>

      {/* 2. Main Mechanism UI Layout */}
      <div style={styles.container}>
        
        {/* Large Drive Gear - 80px (Base Speed: 4 seconds) */}
        <div style={{ ...styles.gearWrapper, ...styles.largeGear }}>
          <IoSettingsSharp />
        </div>

        {/* Medium Idler Gear - 55px (Spins backwards and 1.5x faster) */}
        <div style={{ ...styles.gearWrapper, ...styles.mediumGear }}>
          <IoSettingsSharp />
        </div>

        {/* Small Driven Gear - 35px (Spins forwards and 2.3x faster) */}
        <div style={{ ...styles.gearWrapper, ...styles.smallGear }}>
          <IoSettingsSharp />
        </div>

      </div>
    </>
  );
}

// 3. Inline CSS Configuration Objects
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '', // Deep mechanical dark background
    padding: '50px',
    borderRadius: '12px',
    width: 'fit-content',
    margin: '20px auto',
    // boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
  },
  
  gearWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transformOrigin: 'center',
  },

  largeGear: {
    fontSize: '100px',
    color: '#F55A28', // Vibrant primary accent
    animation: 'spinClockwise 4s infinite linear',
  },

  mediumGear: {
    fontSize: '55px',
    color: '#0A2342', // Silver contrast color
    marginLeft: '-11px', // Interlocks teeth with the large gear
    // Mechanical Physics Sync: Rotates backward and faster due to smaller diameter
    animation: 'spinCounterClockwise 2.6s infinite linear',
  },

  smallGear: {
    fontSize: '35px',
    color: '#F55A28',
    marginLeft: '-6px', // Interlocks teeth with the medium gear
    // Mechanical Physics Sync: Rotates forward and much faster due to tiny radius
    animation: 'spinClockwise 1.7s infinite linear',
  },
};
