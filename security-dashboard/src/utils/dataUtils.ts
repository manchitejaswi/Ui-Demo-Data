/**
 * Data loading and processing utilities for vulnerability data
 */

import type {
  VulnerabilityData,
  ProcessedVulnerability,
  FilterOptions,
} from '../types/vulnerability';

/**
 * Load vulnerability data from JSON file
 * Uses fetch API to load data efficiently
 */
export async function loadVulnerabilityData(): Promise<VulnerabilityData> {
  try {
    const response = await fetch('/ui_demo.json');
    if (!response.ok) {
      throw new Error('Failed to load vulnerability data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading vulnerability data:', error);
    throw error;
  }
}

/**
 * Process raw vulnerability data into a flat array for easier manipulation
 * Adds contextual information (group, repo, image) to each vulnerability
 */
export function processVulnerabilityData(
  data: VulnerabilityData
): ProcessedVulnerability[] {
  const processed: ProcessedVulnerability[] = [];

  Object.entries(data.groups).forEach(([groupName, group]) => {
    Object.entries(group.repos).forEach(([repoName, repo]) => {
      Object.entries(repo.images).forEach(([imageVersion, image]) => {
        image.vulnerabilities.forEach((vuln) => {
          processed.push({
            ...vuln,
            groupName,
            repoName,
            imageName: image.name,
            imageVersion,
          });
        });
      });
    });
  });

  return processed;
}

/**
 * Filter vulnerabilities based on provided filter options
 * Excludes vulnerabilities with kaiStatus "invalid - norisk" or "ai-invalid-norisk"
 */
export function filterVulnerabilities(
  vulnerabilities: ProcessedVulnerability[],
  filters: FilterOptions
): ProcessedVulnerability[] {
  return vulnerabilities.filter((vuln) => {
    // Filter out kaiStatus values as specified
    if (
      vuln.kaiStatus === 'invalid - norisk' ||
      vuln.kaiStatus === 'ai-invalid-norisk'
    ) {
      return false;
    }

    // Severity filter
    if (filters.severity.length > 0 && !filters.severity.includes(vuln.severity)) {
      return false;
    }

    // kaiStatus filter (for including specific statuses)
    if (filters.kaiStatus.length > 0 && vuln.kaiStatus) {
      if (!filters.kaiStatus.includes(vuln.kaiStatus)) {
        return false;
      }
    }

    // Search term filter (searches in CVE, description, and package name)
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const matchesCVE = vuln.cve.toLowerCase().includes(searchLower);
      const matchesDescription = vuln.description.toLowerCase().includes(searchLower);
      const matchesPackage = vuln.packageName.toLowerCase().includes(searchLower);

      if (!matchesCVE && !matchesDescription && !matchesPackage) {
        return false;
      }
    }

    // Package name filter
    if (filters.packageName && vuln.packageName !== filters.packageName) {
      return false;
    }

    // Date range filter
    if (filters.dateRange.start || filters.dateRange.end) {
      const publishedDate = new Date(vuln.published);

      if (filters.dateRange.start) {
        const startDate = new Date(filters.dateRange.start);
        if (publishedDate < startDate) {
          return false;
        }
      }

      if (filters.dateRange.end) {
        const endDate = new Date(filters.dateRange.end);
        if (publishedDate > endDate) {
          return false;
        }
      }
    }

    return true;
  });
}

/**
 * Sort vulnerabilities by various criteria
 */
export function sortVulnerabilities(
  vulnerabilities: ProcessedVulnerability[],
  sortBy: 'severity' | 'cvss' | 'published' | 'cve',
  order: 'asc' | 'desc' = 'desc'
): ProcessedVulnerability[] {
  const sorted = [...vulnerabilities];

  const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };

  sorted.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'severity':
        comparison = severityOrder[a.severity] - severityOrder[b.severity];
        break;
      case 'cvss':
        comparison = a.cvss - b.cvss;
        break;
      case 'published':
        comparison = new Date(a.published).getTime() - new Date(b.published).getTime();
        break;
      case 'cve':
        comparison = a.cve.localeCompare(b.cve);
        break;
    }

    return order === 'asc' ? comparison : -comparison;
  });

  return sorted;
}

/**
 * Get unique values for a specific field
 */
export function getUniqueValues(
  vulnerabilities: ProcessedVulnerability[],
  field: keyof ProcessedVulnerability
): string[] {
  const uniqueSet = new Set<string>();

  vulnerabilities.forEach((vuln) => {
    const value = vuln[field];
    if (value && typeof value === 'string') {
      uniqueSet.add(value);
    }
  });

  return Array.from(uniqueSet).sort();
}

/**
 * Calculate statistics from vulnerabilities
 */
export function calculateStatistics(vulnerabilities: ProcessedVulnerability[]) {
  const total = vulnerabilities.length;

  const bySeverity = {
    critical: vulnerabilities.filter((v) => v.severity === 'critical').length,
    high: vulnerabilities.filter((v) => v.severity === 'high').length,
    medium: vulnerabilities.filter((v) => v.severity === 'medium').length,
    low: vulnerabilities.filter((v) => v.severity === 'low').length,
  };

  const withFix = vulnerabilities.filter((v) => v.status.includes('fixed')).length;

  const avgCVSS =
    vulnerabilities.reduce((sum, v) => sum + v.cvss, 0) / total || 0;

  const riskFactorsCount: Record<string, number> = {};
  vulnerabilities.forEach((v) => {
    Object.keys(v.riskFactors).forEach((rf) => {
      riskFactorsCount[rf] = (riskFactorsCount[rf] || 0) + 1;
    });
  });

  return {
    total,
    bySeverity,
    withFix,
    avgCVSS,
    riskFactorsCount,
  };
}
