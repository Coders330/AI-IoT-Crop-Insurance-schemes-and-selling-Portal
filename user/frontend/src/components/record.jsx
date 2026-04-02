import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Record = () => {
  const {id} = useParams();
  const [array,setArray] = useState([]);
  const [result,setResult] = useState({});  
  useEffect(() => {
     const fetchRecord = async() => {
     try {
         const {data} = await axios.post('http://localhost:5000/records/fetchSpecific',{id:id});
         setArray(data.data);
         setResult(data.result);
         console.log(result);
     } catch (error) {
        console.log(error);
     }
    }
    fetchRecord();
  },[id]);

  const styles = {
    container: {
      fontFamily: 'Inter, Roboto, Arial, sans-serif',
      color: '#0f172a',
      padding: '24px',
      display: 'flex',
      justifyContent: 'center',
      background: 'linear-gradient(180deg,#f8fafc,#eef2ff)',
      minHeight: '100vh'
    },
    card: {
      width: '100%',
      maxWidth: 'none',
      background: '#ffffff',
      boxShadow: '0 10px 30px rgba(2,6,23,0.08)',
      borderRadius: '12px',
      padding: '24px'
    },
    header: {
      background: 'linear-gradient(90deg,#4f46e5 0%,#06b6d4 100%)',
      color: '#ffffff',
      borderBottom: 'none',
      padding: '16px 20px',
      marginBottom: '18px',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: { fontSize: '20px', margin: 0, fontWeight: 700, color: '#ffffff' },
    meta: { textAlign: 'right', color: 'rgba(255,255,255,0.9)', fontSize: '13px' },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px'
    },
    item: {
      background: 'linear-gradient(180deg,#ffffff,#f1f5f9)',
      padding: '18px',
      borderRadius: '10px',
      height: '120px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      border: '1px solid rgba(99,102,241,0.06)',
      boxShadow: '0 6px 16px rgba(15,23,42,0.04)'
    },
    label: { fontSize: '12px', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.02em' },
    value: { fontSize: '18px', color: '#0f172a', fontWeight: 700 }
  };

  // derive a simple health status from sensor ranges
  const parseNum = v => (v === undefined || v === null || v === '') ? NaN : Number(v);
  const soilM = parseNum(array?.soilMoisture);
  const airT = parseNum(array?.airTemp);
  const hum = parseNum(array?.humidity);
  const soilT = parseNum(array?.soilTemp);

  const status = (() => {
    if ([soilM, airT, hum, soilT].some(v => isNaN(v))) {
      return { label: 'Unknown', color: '#6b7280', advice: 'Awaiting full sensor data.' };
    }
    const checks = [
      soilM >= 30 && soilM <= 70,
      airT >= 18 && airT <= 30,
      hum >= 40 && hum <= 70,
      soilT >= 15 && soilT <= 30
    ];
    const score = checks.filter(Boolean).length;
    if (score >= 3) return { label: 'Healthy', color: '#10b981', advice: 'Conditions are good — continue regular monitoring.' };
    if (score === 2) return { label: 'Monitor', color: '#f59e0b', advice: 'Some metrics deviate — check irrigation and microclimate.' };
    return { label: 'Attention', color: '#ef4444', advice: 'Multiple metrics out of range — inspect crops and sensors.' };
  })();

  const val = (v, unit = '') => (isNaN(parseNum(v)) ? '—' : `${parseFloat(v).toFixed(1)}${unit}`);

  const resultText = status.label === 'Healthy' ? 'No Insurance' : 'Insurance Recommended';

  return (
    <div style={styles.container}>
      <div style={{ ...styles.card, maxWidth: '100%' }}>
        <div style={styles.header}>
          <h1 style={styles.title}>Crop Assessment Report</h1>
          <div style={styles.meta}>
            <div>Record ID: <strong>{id}</strong></div>
            <div style={{ marginTop: 4, color: 'rgba(230,238,252,0.9)', fontSize: 13 }}>Time: {array?.time ?? '—'}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20, alignItems: 'start' }}>
          {/* Metrics grid (left) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            <div style={{ ...styles.item, alignItems: 'center', gap: 14, display: 'flex' }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: 'linear-gradient(180deg,#bfdbfe,#93c5fd)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 2C12 2 6 8 6 12a6 6 0 0 0 12 0c0-4-6-10-6-10z" fill="#1D4ED8"/>
                  <circle cx="12" cy="14" r="1.8" fill="#DBEAFE"/>
                </svg>
              </div>
              <div>
                <div style={styles.label}>Soil Moisture</div>
                <div style={styles.value}>{val(soilM, '%')}</div>
              </div>
            </div>

            <div style={{ ...styles.item, alignItems: 'center', gap: 14, display: 'flex' }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: 'linear-gradient(180deg,#dbeafe,#c7f9fb)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M14 14.5V6a2 2 0 10-4 0v8.5a4 4 0 104 0z" fill="#0369A1"/>
                  <circle cx="12" cy="17" r="1.5" fill="#A7F3D0"/>
                </svg>
              </div>
              <div>
                <div style={styles.label}>Air Temperature</div>
                <div style={styles.value}>{val(airT, '°C')}</div>
              </div>
            </div>

            <div style={{ ...styles.item, alignItems: 'center', gap: 14, display: 'flex' }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: 'linear-gradient(180deg,#ecfeff,#dbeafe)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M20 17H7a4 4 0 1 1 .5-7.98A5.5 5.5 0 1 1 20 17z" fill="#0EA5A4"/>
                  <circle cx="8" cy="18.5" r="1" fill="#E6FFFA"/>
                </svg>
              </div>
              <div>
                <div style={styles.label}>Humidity</div>
                <div style={styles.value}>{val(hum, '%')}</div>
              </div>
            </div>

            <div style={{ ...styles.item, alignItems: 'center', gap: 14, display: 'flex' }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: 'linear-gradient(180deg,#fff7ed,#ffedd5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M6 21s1.5-4 6-7c4.5-3 6-3 6-3s-1 3-4 5c-3 2-8 5-8 5z" fill="#065F46"/>
                  <path d="M14 3v8" stroke="#F97316" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div style={styles.label}>Soil Temperature</div>
                <div style={styles.value}>{val(soilT, '°C')}</div>
              </div>
            </div>
          </div>

          {/* Status panel (right) */}
          <aside style={{ background: 'linear-gradient(180deg,#ffffff,#fbfdff)', padding: 20, borderRadius: 12, boxShadow: '0 8px 24px rgba(2,6,23,0.06)', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 72, height: 72, borderRadius: 14, background: status.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 20 }}>
              {status.label[0]}
            </div>
            <h2 style={{ margin: 0, fontSize: 20 }}>{status.label}</h2>
            <p style={{ margin: 0, color: '#475569', textAlign: 'center' }}>{status.advice}</p>
            <div style={{ marginTop: 8, width: '100%', borderTop: '1px solid rgba(15,23,42,0.04)', paddingTop: 12, textAlign: 'center', color: '#0f172a' }}>
              <div style={{ fontSize: 13, color: '#64748b' }}>Recommendation</div>
              <div style={{ fontWeight: 700, marginTop: 6 }}>{resultText}</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
export default Record;
