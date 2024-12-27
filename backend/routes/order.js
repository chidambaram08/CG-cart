const express = require("express");
const { newOrder,  getSingleOrder, myOrder, orders, updateOrder, deleteOrder } = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/authenicate");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/myorders").get(isAuthenticatedUser, myOrder);


//Admin Routes
router.route('/admin/order').get(isAuthenticatedUser,authorizeRoles('admin'),orders);
router.route("/admin/order/:id").put(isAuthenticatedUser,authorizeRoles('admin') ,updateOrder);
router.route("/admin/order/:id").delete(isAuthenticatedUser,authorizeRoles('admin') ,deleteOrder);

module.exports = router;
