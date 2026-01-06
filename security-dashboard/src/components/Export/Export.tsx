/**
 * Export Component
 * Allows exporting filtered vulnerability data to JSON or CSV
 */

import React from 'react';
import type { ProcessedVulnerability } from '../../types/vulnerability';
import './Export.css';

interface ExportProps {
  vulnerabilities: ProcessedVulnerability[];
}

const Export: React.FC<ExportProps> = ({ vulnerabilities }) => {
  const exportToJSON = () => {
    const dataStr = JSON.stringify(vulnerabilities, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vulnerabilities-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportToCSV = () => {
    // CSV headers
    const headers = [
      'CVE',
      'Severity',
      'CVSS',
      'Package Name',
      'Package Version',
      'Status',
      'Published',
      'Fix Date',
      'Group',
      'Repository',
      'Image',
      'Description',
    ];

    // Convert data to CSV rows
    const rows = vulnerabilities.map((vuln) => [
      vuln.cve,
      vuln.severity,
      vuln.cvss,
      vuln.packageName,
      vuln.packageVersion,
      vuln.status,
      vuln.published,
      vuln.fixDate,
      vuln.groupName,
      vuln.repoName,
      vuln.imageName,
      `"${vuln.description.replace(/"/g, '""')}"`, // Escape quotes in description
    ]);

    // Combine headers and rows
    const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');

    const dataBlob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vulnerabilities-export-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="export-container">
      <h3>Export Data</h3>
      <p className="export-info">
        Export {vulnerabilities.length} filtered vulnerabilities
      </p>
      <div className="export-buttons">
        <button onClick={exportToJSON} className="export-button json-button">
          Export as JSON
        </button>
        <button onClick={exportToCSV} className="export-button csv-button">
          Export as CSV
        </button>
      </div>
    </div>
  );
};

export default Export;
