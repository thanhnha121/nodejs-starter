import * as express from 'express';

import TestCtr from './controller/nhaht_test';
import PushMessageLogCtr from './controller/push_message_log';
import CafeFPushMessageCtr from './controller/cafe_f_push_message';
import GiftcodeCtr from './controller/giftcode';
import GroupGiftcodeCtr from './controller/group_giftcode';
import GroupUserCtr from './controller/group_user';
import CampaignCtr from './controller/campaign';
import CampaignPostCtr from './controller/campaign_post';
import SessionCtr from './controller/session';
import ConnectConfigCtr from './controller/connect_config';
import ShortLinkCtr from './controller/short_link';
import StatisticCtr from './controller/statistic';
import GoogleApis from './controller/google/services/google_auth';
import TicketCtr from './controller/ticket/ticket';
import TicketCommentCtr from './controller/ticket/ticket_comment';
import TicketMentionCtr from './controller/ticket/ticket_mention';
import TicketGroupUserCtr from './controller/ticket/ticket_group_user';
import TicketNotificationCtr from './controller/ticket/ticket_notification';
import MigrationsCtr from './controller/migrations';
import ImageCtr from './controller/image/image-processing';
import Sport5Ctr from './controller/outside/sport5';

export default function setRoutes(app) {
  const router = express.Router();

  const testCtr = new TestCtr();
  const giftcodeCtr = new GiftcodeCtr();
  const pushMessageLogCtr = new PushMessageLogCtr();
  const cafeFPushMessageCtr = new CafeFPushMessageCtr();
  const groupGiftcodeCtr = new GroupGiftcodeCtr();
  const groupUserCtr = new GroupUserCtr();
  const campaignCtr = new CampaignCtr();
  const campaignPostCtr = new CampaignPostCtr();
  const sessionCtr = new SessionCtr();
  const connectConfigCtr = new ConnectConfigCtr();
  const shortLinkCtr = new ShortLinkCtr();
  const statisticCtr = new StatisticCtr();
  const googleApi = new GoogleApis();
  const ticketCtr = new TicketCtr();
  const ticketCommentCtr = new TicketCommentCtr();
  const ticketMentionCtr = new TicketMentionCtr();
  const ticketGroupUserCtr = new TicketGroupUserCtr();
  const ticketNotificationCtr = new TicketNotificationCtr();
  const migrationsCtr = new MigrationsCtr();
  const imageCtr = new ImageCtr();
  const sport5Ctr = new Sport5Ctr();

  // sport5
  app.route('/api/sport5/get_rate').get(sport5Ctr.getRate);
  app.route('/api/sport5/get_listnews').get(sport5Ctr.getListnews);
  app.route('/api/sport5/get_listvideos').get(sport5Ctr.getListvideos);
  app.route('/api/sport5/push_sport5_news').get(sport5Ctr.pushSport5News);

  // image
  app.route('/api/image/get_match_thumbnail/:match').get(imageCtr.getMatchThumbnail);

  // mail connect
  app.route('/api/mail/get_all_configs/:project/:fanpageID').get(connectConfigCtr.getAllConfigs);

  // migrations
  app.route('/api/migrations/fix_attributes/:fanpageID').get(migrationsCtr.fixAttributes);

  // test
  // app.route('/api/test/test_redis').get(testCtr.testRedis);
  // app.route('/api/test/bulk_insert').get(testCtr.testBulk);
  // app.route('/api/test/test_pm2').get(testCtr.testPM2);
  // app.route('/api/test/func').get(testCtr.testFunc);
  // app.route('/api/test/test_facebook').get(testCtr.testFacebook);
  app.route('/api/test/demo_api').get(testCtr.demoAPI);

  // ticket
  app.route('/api/ticket/create_ticket').post(ticketCtr.createTicket);
  app.route('/api/ticket/get_all_ticket_of_project/:project').get(ticketCtr.getAllTicketOfProject);
  app.route('/api/ticket/get_all_related_ticket_of_group/:group_id').get(ticketCtr.getAllRelatedTicketOfGroup);
  app.route('/api/ticket/get_all_related_ticket_of_user/:created_by').get(ticketCtr.getAllRelatedTicketOfUser);
  app.route('/api/ticket/update_ticket/').post(ticketCtr.updateTicket);

  app.route('/api/ticket_comment/create_comment').post(ticketCommentCtr.createComment);
  app.route('/api/ticket_comment/get_all_comment_of_ticket/:ticket_id').get(ticketCommentCtr.getAllCommentOfTicket);
  app.route('/api/ticket_comment/update_comment').post(ticketCommentCtr.updateComment);
  app.route('/api/ticket_comment/get_new_comment').post(ticketCommentCtr.getNewComment);
  app.route('/api/ticket_comment/get_all_latest_comment_by_project/:project').get(ticketCommentCtr.getAllLatestCommentByProject);
  app.route('/api/ticket_comment/get_all_new_comment_by_project/').post(ticketCommentCtr.getAllNewCommentByProject);

  app.route('/api/ticket_group_user/create_group_user').post(ticketGroupUserCtr.createGroupUser);
  app.route('/api/ticket_group_user/update_group_user').post(ticketGroupUserCtr.updateGroupUser);
  app.route('/api/ticket_group_user/get_all_group_user/:project/:user_id').get(ticketGroupUserCtr.getAllGroupUser);

  app.route('/api/ticket_notification/get_all_notification_of_user/:user_id').get(ticketNotificationCtr.getAllNotificationOfUser);
  app.route('/api/ticket_notification/update_noti/:notification_id').get(ticketNotificationCtr.updateNotification);
  app.route('/api/ticket_notification/check_all_read_noti_of_ticket/:ticket_id/:user_id').get(ticketNotificationCtr.checkAllReadNotiOfTicket);
  app.route('/api/ticket_notification/get_all_unread_notification_of_user/:user_id').get(ticketNotificationCtr.getAllUnreadNotificationOfUser);
  app.route('/api/ticket_notification/get_noti_paged').post(ticketNotificationCtr.getNotiPaged);

  app.route('/api/ticket_mention/get_all_mentions').post(ticketMentionCtr.getAllMentions);


  // statistic
  app.route('/api/statistic/get_click_statistic').post(statisticCtr.getClickStatistic);

  // app.route('/api/user/count_all').get(userCtr.countAll);

  // cafeFPushMessageCtr
  app.route('/api/cafe_f_push_message/run/:count/:minute_since/:unsubscribe_payload').get(cafeFPushMessageCtr.pushCafeFNews);

  // group giftcode
  app.route('/api/group_giftcode/get_list_giftcode_and_remain').post(groupGiftcodeCtr.getListGiftcodeAndRemain);
  app.route('/api/group_giftcode/get_list_giftcode_by_project/:project').get(groupGiftcodeCtr.getListGiftcodeByProject);
  app.route('/api/group_giftcode/delete_group_giftcode/:_id/:push_message_token').delete(groupGiftcodeCtr.deleteGroupGiftcode);
  app.route('/api/group_giftcode/get_all_event/:project/:fanpageID').get(groupGiftcodeCtr.getAllEvent);

  // giftcode
  app.route('/api/giftcode/insert').post(giftcodeCtr.bulkInsertGiftcode);
  app.route('/api/giftcode/update_profile').get(giftcodeCtr.updateProfile);
  app.route('/api/giftcode/insert_single').post(giftcodeCtr.insertSingle);
  app.route('/api/giftcode/insert_by_file').post(giftcodeCtr.insertByFile);
  app.route('/api/giftcode/filter').post(giftcodeCtr.filterGiftcode);
  app.route('/api/giftcode/get_giftcode_by_sender_id').post(giftcodeCtr.getGiftcodeBySenderId);
  app.route('/api/giftcode/update_giftcode_after_sent').post(giftcodeCtr.updateGiftcodeAfterSent);
  app.route('/api/giftcode/delete_single/:_id/:push_message_token').delete(giftcodeCtr.deleteSingle);
  app.route('/api/giftcode/delete_all/:_id/:push_message_token').delete(giftcodeCtr.deleteAllGiftcode);
  app.route('/api/giftcode/get_giftcode').post(giftcodeCtr.getGiftcode);
  


  // campaign
  // app.route('/api/campaign/delete_campaign/:_id/:push_message_token').delete(campaignCtr.deleteCampaign);
  app.route('/api/campaign/stop_campaign_post_schedule_of_campaign/:_id/:push_message_token').delete(campaignPostCtr.removeCampaign);
  app.route('/api/campaign/get_campaign_with_post/:project/:fanpageID').get(campaignCtr.getCampaignWithPost);
  app.route('/api/campaign/get_all_campaigns/:project/:fanpageID').get(campaignCtr.getAllCampaigns);

  // campaign post
  app.route('/api/campaign_post/filter_campaign_post').post(campaignPostCtr.filterCampaignPost);
  app.route('/api/campaign_post/add_new_campaign_post').post(campaignPostCtr.addNewCampaignPost);
  app.route('/api/campaign_post/create_campaign_post_schedule/:_id').post(campaignPostCtr.createOrUpdateCampaignPostSchedule);
  app.route('/api/campaign_post/do_push_schedule/:_id').get(campaignPostCtr.doPushSchedule);
  app.route('/api/campaign_post/stop_schedule/:_id').get(campaignPostCtr.stopSchedule);
  app.route('/api/campaign_post/update_campaign_post').post(campaignPostCtr.updateCampaignPost);
  app.route('/api/campaign_post/stop_push_message/:_id/:fanpage_id').get(campaignPostCtr.stopPushMessage);
  app.route('/api/campaign_post/stop_push_message_schedule').post(campaignPostCtr.stopPushMessageSchedule);


  // group user
  app.route('/api/group_user/delete_group_user/:_id/:push_message_token').delete(groupUserCtr.deleteGroupUser);
  app.route('/api/group_user/insert_group_user').post(groupUserCtr.insertGroupUser);
  app.route('/api/group_user/update_group_user').post(groupUserCtr.updateGroupUser);
  app.route('/api/group_user/migrate').get(groupUserCtr.migrate);
  app.route('/api/group_user/get_all_group_users/:project/:fanpageID').get(groupUserCtr.getAllGroupUsers);


  // pushMessageLog
  app.route('/api/push_message/write_postlog').post(pushMessageLogCtr.writePostLog);
  app.route('/api/push_message/get_comment_replied_by_type').post(pushMessageLogCtr.getCommentRepliedByType);


  // session
  app.route('/api/session/check_login').post(sessionCtr.checkLogin);

  // Connect ConfigCtr
  app.route('/api/connect_config/delete_connect_config/:_id/:push_message_token').delete(connectConfigCtr.deleteConnectConfig);


  // short link
  app.route('/api/short_link/generate_short_link_for_campaign_post').post(shortLinkCtr.generateShortLinkForCampaignPost);
  app.route('/shortener/:short_link').get(shortLinkCtr.decodeShortLink);
  app.route('/api/short_link/statistic_by_campaign_post/:campaign_post_id').get(shortLinkCtr.statisticByCampaignPost);

  // google
  app.route('/api/google/get_project_info').get(googleApi.getProjectInfo);
  app.route('/api/google/get_google_token').post(googleApi.getGoogleToken);
  app.route('/api/google/get_new_access_token_by_code').post(googleApi.getNewAccessTokenByCode);
  app.route('/api/google/create_file').post(googleApi.createFile);
  app.route('/api/google/get_file').post(googleApi.getFile);
  app.route('/api/google/update_file').post(googleApi.updateFile);
}