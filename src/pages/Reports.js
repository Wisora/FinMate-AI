import React, { useState } from 'react';
import ReportCard from '../components/Dashboard/ReportCard';
import Spinner from '../components/common/Spinner';
import PromoBanner from '../components/common/PromoBanner';
import { generateWeeklyReport, generateMonthlyReport, getReports } from '../services/reportsService';
import { useLanguage } from '../i18n/LanguageContext';

function Reports({ showToast }) {
  const [reports, setReports] = useState(getReports());
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleGenerateWeeklyReport = () => {
    setLoading(true);
    setTimeout(() => {
      const newReport = generateWeeklyReport(12000, 8500);
      setReports([...reports, newReport]);
      setLoading(false);
      showToast("📊 Weekly report generated!");
    }, 1000);
  };

  const handleGenerateMonthlyReport = () => {
    setLoading(true);
    setTimeout(() => {
      const newReport = generateMonthlyReport(48000, 36000);
      setReports([...reports, newReport]);
      setLoading(false);
      showToast("📈 Monthly report generated!");
    }, 1000);
  };

  return (
    <div className="reports-page">
      <h2>{t("reports")}</h2>

      {/* Promo banner for upsell */}
      <PromoBanner 
        message="📈 Unlock Pro to export reports and access advanced analytics!" 
        link="/upgrade" 
      />

      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="reports-actions">
            <button 
              onClick={handleGenerateWeeklyReport} 
              aria-label="Generate weekly financial report"
            >
              Generate Weekly Report
            </button>
            <button 
              onClick={handleGenerateMonthlyReport} 
              aria-label="Generate monthly financial report"
            >
              Generate Monthly Report
            </button>
          </div>

          {reports.length === 0 ? (
            <p>No reports yet. Generate one to get started!</p>
          ) : (
            <div className="reports-grid">
              {reports.map(report => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Reports;
