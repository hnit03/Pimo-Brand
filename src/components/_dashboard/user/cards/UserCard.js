import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import twitterFill from "@iconify/icons-eva/twitter-fill";
import linkedinFill from "@iconify/icons-eva/linkedin-fill";
import facebookFill from "@iconify/icons-eva/facebook-fill";
import instagramFilled from "@iconify/icons-ant-design/instagram-filled";
// material
import { alpha, styled } from "@material-ui/core/styles";
import {
  Box,
  Card,
  Grid,
  Avatar,
  Tooltip,
  Divider,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
// utils
import { fShortenNumber } from "../../../../utils/formatNumber";
//
import SvgIconStyle from "../../../SvgIconStyle";
import LocationOn from "@material-ui/icons/LocationOn";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: "Facebook",
    icon: <Icon icon={facebookFill} width={20} height={20} color="#1877F2" />,
  },
  {
    name: "Instagram",
    icon: (
      <Icon icon={instagramFilled} width={20} height={20} color="#D7336D" />
    ),
  },
  {
    name: "Linkedin",
    icon: <Icon icon={linkedinFill} width={20} height={20} color="#006097" />,
  },
  {
    name: "Twitter",
    icon: <Icon icon={twitterFill} width={20} height={20} color="#1C9CEA" />,
  },
];

const CardMediaStyle = styled("div")(({ theme }) => ({
  display: "flex",
  position: "relative",
  justifyContent: "center",
  paddingTop: "calc(100% * 9 / 16)",
  "&:before": {
    top: 0,
    zIndex: 9,
    content: "''",
    width: "100%",
    height: "100%",
    position: "absolute",
    // backdropFilter: 'blur(3px)',
    WebkitBackdropFilter: "blur(3px)", // Fix on Mobile
    borderTopLeftRadius: theme.shape.borderRadiusMd,
    borderTopRightRadius: theme.shape.borderRadiusMd,
    // backgroundColor: alpha(theme.palette.primary.darker, 0.72)
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
}));

const CoverImgStyle = styled("img")({
  top: 0,
  zIndex: 8,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
  objectPosition: "0% 15%",
});

// ----------------------------------------------------------------------

function InfoItem(number) {
  return (
    <Grid item xs={4}>
      <Typography
        variant="caption"
        sx={{ mb: 0.5, color: "text.secondary", display: "block" }}
      >
        Follower
      </Typography>
      <Typography variant="subtitle1">{fShortenNumber(number)}</Typography>
    </Grid>
  );
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default function UserCard({ user, ...other }) {
  const {
    name,
    cover,
    position,
    follower,
    totalPost,
    avatarUrl,
    following,
    phone,
    address,
    gift,
    id,
    castingName,
  } = user;
  return (
    <Card {...other}>
      <a
        style={{ textDecoration: "none", color: "black" }}
        href={`https://pimo.studio/model-info/${id}`}
        target="_blank"
      >
        <CardMediaStyle>
          <SvgIconStyle
            color="paper"
            src="/static/icons/shape-avatar.svg"
            sx={{
              width: 144,
              height: 62,
              zIndex: 10,
              bottom: -26,
              position: "absolute",
            }}
          />
          <Avatar
            alt={name}
            src={avatarUrl}
            sx={{
              width: 64,
              height: 64,
              zIndex: 11,
              position: "absolute",
              transform: "translateY(-50%)",
            }}
          />
          <CoverImgStyle alt="cover" src={cover} />
        </CardMediaStyle>

        <Typography
          style={{ marginTop: "2.5rem", height: "2rem", fontSize: "1.25rem" }}
          variant="subtitle1"
          align="center"
        >
          {castingName}
        </Typography>
        {/* <Typography variant="subtitle1" align="center" sx={{ mt: 6 }}>
        {gift}
      </Typography> */}
        <Typography
          style={{ marginTop: "3.5rem" }}
          variant="subtitle1"
          align="center"
          sx={{ mt: 6 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "0.7rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginBottom: "0.5rem",
              }}
            >
              <StarBorderPurple500OutlinedIcon style={{ color: "grey" }} />
              <span
                style={{
                  marginLeft: "1rem",
                  color: "grey",
                  fontSize: "0.95rem",
                }}
              >
               Tên người mẫu :
              </span>
            </div>
            <p
              style={{
                color: "grey",
                marginRight: "0.7rem",
                fontSize: "0.95rem",
              }}
            >
              {name}
            </p>
          </div>
        </Typography>

        <Typography
          style={{margin:0}}
          variant="subtitle1"
          align="center"
          sx={{ mt: 6 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "0.7rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginBottom: "0.5rem",
              }}
            >
              <StarBorderPurple500OutlinedIcon style={{ color: "grey" }} />
              <span
                style={{
                  marginLeft: "1rem",
                  color: "grey",
                  fontSize: "0.95rem",
                }}
              >
                Tài năng :
              </span>
            </div>
            <p
              style={{
                color: "grey",
                marginRight: "0.7rem",
                fontSize: "0.95rem",
              }}
            >
              {gift}
            </p>
          </div>
        </Typography>
        {/* <Typography style={{margin:0}} variant="subtitle1" align="center" sx={{ mt: 6 }}>
        {address}
      </Typography> */}
        {/* <Typography style={{margin:0,marginBottom:'1.5rem'}} variant="subtitle1" align="center" sx={{ mt: 6 }}>
        {phone}
      </Typography> */}
        <Typography
          style={{ margin: 0 }}
          variant="subtitle1"
          align="center"
          sx={{ mt: 6 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "0.7rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginBottom: "0.5rem",
              }}
            >
              <PhoneOutlinedIcon style={{ color: "grey" }} />
              <span
                style={{
                  marginLeft: "1rem",
                  color: "grey",
                  fontSize: "0.95rem",
                }}
              >
                Số điện thoại :
              </span>
            </div>
            <p
              style={{
                color: "grey",
                marginRight: "0.7rem",
                fontSize: "0.95rem",
              }}
            >
              {phone}
            </p>
          </div>
        </Typography>

        <Typography
          style={{ margin: 0, marginBottom: "1rem" }}
          variant="subtitle1"
          align="center"
          sx={{ mt: 6 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "0.7rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginBottom: "0.5rem",
              }}
            >
              <LocationOn style={{ color: "grey" }} />
              <span
                style={{
                  marginLeft: "1rem",
                  color: "grey",
                  fontSize: "0.95rem",
                }}
              >
                Địa chỉ :
              </span>
            </div>
            <p
              style={{
                color: "grey",
                marginRight: "0.7rem",
                fontSize: "0.95rem",
              }}
            >
              {address}
            </p>
          </div>
        </Typography>

        {/* <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
        {position}
      </Typography> */}

        {/* <Box sx={{ textAlign: 'center', mt: 2, mb: 2.5 }}>
        {SOCIALS.map((social) => (
          <Tooltip key={social.name} title={social.name}>
            <IconButton>{social.icon}</IconButton>
          </Tooltip>
        ))}
      </Box> */}

        {/* <Divider /> */}

        {/* <Grid container sx={{ py: 3, alignSelf: 'center' }}> */}
      </a>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          paddingBottom: "1.5rem",
        }}
      >
       
        <Button
          variant="contained"
          //  component={RouterLink}
          //  to={PATH_DASHBOARD.user.newUser}
          //  startIcon={<Icon icon={plusFill} />}
          style={{ backgroundColor: "#FF3030" }}
        >
          Từ chối
        </Button>
        <Button
          variant="contained"
          //  component={RouterLink}
          //  to={PATH_DASHBOARD.user.newUser}
          //  startIcon={<Icon icon={plusFill} />}
          style={{ backgroundColor: "#00AB55" }}
        >
          Chấp nhận
        </Button>
      </div>
      {/* {InfoItem(follower)}
        {InfoItem(following)}
        {InfoItem(totalPost)} */}
      {/* </Grid> */}
    </Card>
  );
}
