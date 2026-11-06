import {
  Sun, CloudSun, Cloud, CloudFog, CloudDrizzle,
  CloudRain, CloudSnow, CloudLightning,
} from "lucide-react";

const TABLE = {
  0: ["Trời quang", Sun],
  1: ["Ít mây", CloudSun],
  2: ["Mây rải rác", CloudSun],
  3: ["Nhiều mây", Cloud],
  45: ["Sương mù", CloudFog],
  48: ["Sương mù đóng băng", CloudFog],
  51: ["Mưa phùn nhẹ", CloudDrizzle],
  53: ["Mưa phùn", CloudDrizzle],
  55: ["Mưa phùn dày", CloudDrizzle],
  61: ["Mưa nhỏ", CloudRain],
  63: ["Mưa vừa", CloudRain],
  65: ["Mưa to", CloudRain],
  71: ["Tuyết nhẹ", CloudSnow],
  73: ["Tuyết", CloudSnow],
  75: ["Tuyết dày", CloudSnow],
  80: ["Mưa rào nhẹ", CloudRain],
  81: ["Mưa rào", CloudRain],
  82: ["Mưa rào mạnh", CloudRain],
  95: ["Dông", CloudLightning],
  96: ["Dông kèm mưa đá nhẹ", CloudLightning],
  99: ["Dông kèm mưa đá lớn", CloudLightning],
};

export function describeWeather(code) {
  const [label, Icon] = TABLE[code] ?? ["Không xác định", Cloud];
  return { label, Icon };
}