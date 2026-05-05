import { ref, get, query, orderByChild } from 'firebase/database';
import { database } from './config';
import { Announcement } from '../../types/Notification';

/**
 * Get active announcements from Firebase
 */
export async function getAnnouncements(): Promise<Announcement[]> {
  const announcementsRef = ref(database, 'Announcements');
  const announcementsQuery = query(announcementsRef, orderByChild('createdAt'));
  const snapshot = await get(announcementsQuery);

  if (!snapshot.exists()) {
    return [];
  }

  const data = snapshot.val();
  const now = new Date().toISOString();

  return Object.keys(data)
    .map((key) => ({
      id: key,
      ...data[key],
    }))
    .filter((announcement) => {
      // Filter out expired announcements
      if (announcement.expiresAt) {
        return announcement.expiresAt > now;
      }
      return true;
    })
    .sort((a, b) => {
      // Sort by priority then by date
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      if (a.priority !== b.priority) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
}
