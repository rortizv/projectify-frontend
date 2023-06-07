export interface Project {
  uid: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
}

export interface GetProjectsResponse {
  projects: Project[];
  total: number;
}

export interface DedicationReport {
  total: number,
  dedications: Dedication[];
}

export interface Dedication {
  startDate: String;
  endDate: String;
  hours: number;
  project: Project;
  user: string;
}

export interface DedicationWork {
  startDate: String;
  endDate: String;
  hours: number;
  project: string;
  user: string;
}

export interface Project {
  uid: string;
  name: string;
}
