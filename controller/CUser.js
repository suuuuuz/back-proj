const { User } = require("../model");

// 로그인 페이지
exports.login = (req, res) => {
  res.render("./login/login");
};
// 로그인 검사
exports.login_check = (req, res) => {
  User.findOne({
    where: {
      id: req.body.id,
      pw: req.body.pw,
    },
  }).then((result) => {
    jwt.sign(
      {
        id: req.body.id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          res
            .status(401)
            .json({ success: false, errormessage: "token sign fail" });
        } else {
          res.cookie("jwt", token);
          res.json({ success: true, accessToken: token });
        }
      }
    );
  });
};
// 네이버 로그인 콜백 페이지
exports.callback = (req, res) => {
  res.render("naver_callback");
};
// 회원가입 페이지
exports.signup = (req, res) => {
  res.render("./signup/signup");
};

// 회원가입 아이디 중복 검사
exports.signup_id_check = (req, res) => {
  User.findOne({
    where: {
      id: req.body.id,
    },
  }).then((result) => {
    if (result) res.send(true);
    else res.send(false);
  });
};

// 유저 생성
exports.signup_create = (req, res) => {
  const data = {
    id: req.body.id,
    pw: req.body.pw,
    name: req.body.name,
    email: req.body.email,
    position: req.body.position,
  };
  User.create(data).then((result) => {
    res.send(true);
  });
};