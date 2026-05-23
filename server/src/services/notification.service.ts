import logger from '../utils/logger';

export enum NotificationType {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
}

interface NotificationPayload {
  type: NotificationType;
  recipient: string;
  subject?: string;
  template: string;
  data: any;
}

export class NotificationService {
  private static instance: NotificationService;

  private constructor() {}

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  /**
   * Main method to send notifications. 
   * In production, this would integrate with SendGrid, Twilio, or Firebase Cloud Messaging.
   */
  public async send(payload: NotificationPayload): Promise<void> {
    try {
      logger.info(`Sending ${payload.type} notification to ${payload.recipient} using template ${payload.template}`, {
        data: payload.data,
      });

      // Simulation of integration
      switch (payload.type) {
        case NotificationType.EMAIL:
          await this.sendEmail(payload);
          break;
        case NotificationType.PUSH:
          await this.sendPush(payload);
          break;
        default:
          throw new Error('Unsupported notification type');
      }
    } catch (error) {
      logger.error('Failed to send notification:', error);
      throw error;
    }
  }

  private async sendEmail(payload: NotificationPayload): Promise<void> {
    // Logic for nodemailer/SendGrid integration
    // const msg = { to: payload.recipient, from: 'no-reply@savoria.com', subject: payload.subject, html: ... }
  }

  private async sendPush(payload: NotificationPayload): Promise<void> {
    // Logic for FCM integration
  }

  // Pre-defined templates
  public async sendOrderConfirmation(email: string, orderDetails: any) {
    await this.send({
      type: NotificationType.EMAIL,
      recipient: email,
      subject: `Order Confirmed - ${orderDetails.orderNumber}`,
      template: 'order_confirmation',
      data: orderDetails,
    });
  }

  public async sendWelcomeEmail(email: string, name: string) {
    await this.send({
      type: NotificationType.EMAIL,
      recipient: email,
      subject: 'Welcome to Savoria',
      template: 'welcome',
      data: { name },
    });
  }
}

export const notificationService = NotificationService.getInstance();
