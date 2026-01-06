/**
 * Statistics Dashboard Component
 * Displays key metrics and statistics about vulnerabilities
 */

import React, { useMemo } from 'react';
import type { ProcessedVulnerability } from '../../types/vulnerability';
import { calculateStatistics } from '../../utils/dataUtils';
import './Statistics.css';

interface StatisticsProps {
  vulnerabilities: ProcessedVulnerability[];
  allVulnerabilities: ProcessedVulnerability[];
}

const Statistics: React.FC<StatisticsProps> = ({
  vulnerabilities,
  allVulnerabilities,
}) => {
  const stats = useMemo(
    () => calculateStatistics(vulnerabilities),
    [vulnerabilities]
  );

  const totalStats = useMemo(
    () => calculateStatistics(allVulnerabilities),
    [allVulnerabilities]
  );

  // Count vulnerabilities with AI analysis
  const aiAnalyzed = useMemo(() => {
    return vulnerabilities.filter((v) => v.kaiStatus).length;
  }, [vulnerabilities]);

  const manualAnalyzed = useMemo(() => {
    return vulnerabilities.filter((v) => !v.kaiStatus).length;
  }, [vulnerabilities]);

  return (
    <div className="statistics-container">
      <h2>Dashboard Statistics</h2>

      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-label">Total Vulnerabilities</div>
          <div className="stat-value">{stats.total.toLocaleString()}</div>
          <div className="stat-subtext">
            of {totalStats.total.toLocaleString()} total
          </div>
        </div>

        <div className="stat-card critical">
          <div className="stat-label">Critical</div>
          <div className="stat-value">{stats.bySeverity.critical.toLocaleString()}</div>
          <div className="stat-percentage">
            {((stats.bySeverity.critical / stats.total) * 100).toFixed(1)}%
          </div>
        </div>

        <div className="stat-card high">
          <div className="stat-label">High</div>
          <div className="stat-value">{stats.bySeverity.high.toLocaleString()}</div>
          <div className="stat-percentage">
            {((stats.bySeverity.high / stats.total) * 100).toFixed(1)}%
          </div>
        </div>

        <div className="stat-card medium">
          <div className="stat-label">Medium</div>
          <div className="stat-value">{stats.bySeverity.medium.toLocaleString()}</div>
          <div className="stat-percentage">
            {((stats.bySeverity.medium / stats.total) * 100).toFixed(1)}%
          </div>
        </div>

        <div className="stat-card low">
          <div className="stat-label">Low</div>
          <div className="stat-value">{stats.bySeverity.low.toLocaleString()}</div>
          <div className="stat-percentage">
            {((stats.bySeverity.low / stats.total) * 100).toFixed(1)}%
          </div>
        </div>

        <div className="stat-card cvss">
          <div className="stat-label">Average CVSS</div>
          <div className="stat-value">{stats.avgCVSS.toFixed(1)}</div>
          <div className="stat-subtext">out of 10</div>
        </div>

        <div className="stat-card fix">
          <div className="stat-label">With Fix Available</div>
          <div className="stat-value">{stats.withFix.toLocaleString()}</div>
          <div className="stat-percentage">
            {((stats.withFix / stats.total) * 100).toFixed(1)}%
          </div>
        </div>

        <div className="stat-card ai">
          <div className="stat-label">AI vs Manual Analysis</div>
          <div className="stat-value-small">
            <span className="ai-count">AI: {aiAnalyzed.toLocaleString()}</span>
            <span className="manual-count">Manual: {manualAnalyzed.toLocaleString()}</span>
          </div>
          <div className="stat-percentage">
            {stats.total > 0 ? ((aiAnalyzed / stats.total) * 100).toFixed(1) : 0}% AI
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
