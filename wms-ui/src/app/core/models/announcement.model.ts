export interface Announcement
{
  announcementId: number;

  title: string;

  message: string;

  createdBy: number;

  createdOn: Date;

  isActive: boolean;
}
