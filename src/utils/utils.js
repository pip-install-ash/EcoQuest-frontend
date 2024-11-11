import { Buildings } from "./const";

const calcIsForbidden = (scene, x, y, buildingId) => {
  const building = Buildings.filter((v) => v.id === buildingId)[0];
  const tileMap = scene.gameInitMap;
  let flag = false;
  for (let i = x; i > x - building.w; i--) {
    for (let j = y; j > y - building.h; j--) {
      if (tileMap[i][j].key !== 0) {
        flag = true;
      }
    }
  }
  return flag;
};

export { calcIsForbidden };
