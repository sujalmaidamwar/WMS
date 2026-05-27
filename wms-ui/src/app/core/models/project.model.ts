export interface Project
{
    projectId: number;

    projectName: string;

    description: string;

    startDate: Date;

    endDate: Date;

    clientId?: number;

    clientName?: string;
}
