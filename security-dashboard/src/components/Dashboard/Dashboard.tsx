/**
 * Main Dashboard Component
 * Orchestrates all dashboard components and layout
 */

import React, { lazy, Suspense } from 'react';
import { useVulnerability } from '../../context/VulnerabilityContext';
import Statistics from './Statistics';
import VulnerabilityList from './VulnerabilityList';
import SearchFilter from '../Search/SearchFilter';
import Export from '../Export/Export';
import Comparison from '../Comparison/Comparison';
import './Dashboard.css';

// Lazy load chart components for code splitting
const SeverityChart = lazy(() => import('../Charts/SeverityChart'));
const RiskFactorsChart = lazy(() => import('../Charts/RiskFactorsChart'));
const TrendChart = lazy(() => import('../Charts/TrendChart'));

const Dashboard: React.FC = () => {
  const {
    filteredVulnerabilities,
    allVulnerabilities,
    loading,
    error,
    selectedVulnerabilities,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  } = useVulnerability();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'severity' | 'cvss' | 'published' | 'cve');
  };

  const handleOrderChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading vulnerability data...</p>
        <p className="loading-subtext">This may take a moment for large datasets</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <h2>Error Loading Data</h2>
        <p>{error}</p>
        <p className="error-subtext">
          Please ensure the ui_demo.json file is in the public directory
        </p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🔒 Security Vulnerability Dashboard</h1>
          <p className="header-subtitle">
            Comprehensive analysis of vulnerabilities with AI-powered insights
          </p>
        </div>
      </header>

      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <SearchFilter />
          <Export vulnerabilities={filteredVulnerabilities} />
        </aside>

        <main className="dashboard-main">
          <Statistics
            vulnerabilities={filteredVulnerabilities}
            allVulnerabilities={allVulnerabilities}
          />

          {selectedVulnerabilities.length > 0 && <Comparison />}

          <div className="charts-section">
            <h2>Data Visualization</h2>
            <Suspense fallback={<div className="chart-loading">Loading charts...</div>}>
              <div className="charts-grid">
                <SeverityChart vulnerabilities={filteredVulnerabilities} />
                <RiskFactorsChart vulnerabilities={filteredVulnerabilities} />
              </div>
              <TrendChart vulnerabilities={filteredVulnerabilities} />
            </Suspense>
          </div>

          <div className="list-controls">
            <div className="sort-controls">
              <label>
                Sort by:
                <select value={sortBy} onChange={handleSortChange}>
                  <option value="severity">Severity</option>
                  <option value="cvss">CVSS Score</option>
                  <option value="published">Published Date</option>
                  <option value="cve">CVE ID</option>
                </select>
              </label>
              <button onClick={handleOrderChange} className="order-button">
                {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
              </button>
            </div>
          </div>

          <VulnerabilityList vulnerabilities={filteredVulnerabilities} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
