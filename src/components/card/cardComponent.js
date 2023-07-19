/* eslint-disable react/prop-types */
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Link from "next/link";
import { useTheme } from '@mui/material/styles';

export const CardComponent = ({
    title,
    description,
    image,
    url,
}) => {
  const theme = useTheme();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link href={url} style={{ textDecoration: "none" }}>
        <CardActionArea>
          <CardMedia component="img" height="140" image={image} alt={title} />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: "bold",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.secondary.main,
                fontFamily: theme.typography.fontFamily,
                fontStyle: "italic",
              }}
            >
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};
