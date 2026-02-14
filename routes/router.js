const { Router } = require("express");
const router = Router();
const controller = require("../controllers/controller");

router.get("/", controller.getAllMessages);

router.get("/message/:messageId", controller.getMessageId);

router.get("/new", controller.newMessageGet);

router.post("/new", controller.newMessagePost);

module.exports = router;
