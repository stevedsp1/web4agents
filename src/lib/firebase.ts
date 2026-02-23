import { getApps, initializeApp, getApp, cert, type App } from "firebase-admin/app";
import { getFirestore as getFirestoreAdmin, type Firestore } from "firebase-admin/firestore";

let app: App | null = null;

function initFirebase(): App | null {
  if (app) return app;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  if (!projectId || !clientEmail || !privateKey) return null;
  try {
    const key = privateKey.replace(/\\n/g, "\n");
    if (getApps().length === 0) {
      app = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: key,
        }),
      });
    } else {
      app = getApp();
    }
    return app;
  } catch {
    return null;
  }
}

/** Returns Firestore or null if Firebase is not configured. */
export function getFirestore(): Firestore | null {
  const a = initFirebase();
  if (!a) return null;
  return getFirestoreAdmin(a);
}

export interface SubscriberDoc {
  email: string;
  locale: string;
  source: "newsletter" | "audit";
  subscribedAt: unknown;
  status: "active" | "unsubscribed";
}

export interface AuditRequestDoc {
  email: string;
  url: string;
  message?: string;
  requestedAt: unknown;
  status: "pending" | "contacted" | "completed";
}
