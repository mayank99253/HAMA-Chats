import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllContact ,getMessagesByUserId ,sendMessage ,getChatsPartners} from '../controllers/message.controller.js'

const router = express.Router();

router.get('/contacts', protectRoute, getAllContact)
router.get('/chats',protectRoute,getChatsPartners)
router.get('/:id',protectRoute , getMessagesByUserId)
router.post('/send/:id' ,protectRoute,sendMessage)

export default router;