//引入gulp
var gulp = require("gulp"),
  spritesmith = require("gulp.spritesmith");

gulp.task("default", function () {
  return gulp
    .src("img/*.png") //需要合并的所有图片的地址（尽量不要使用非png格式图片，否则可能会报错）
    .pipe(
      spritesmith({
        imgName: "img/final.png", //最终生成的那一张图片路径位置
        cssName: "css/final.css", //对这一张大图片的各个小图标位置和大小描述的css文件路径与位置
        padding: 0, //合并时两个图片的间距
        algorithm: "top-down", //图标在合并后的图片上的排列方式:从上至下top-down、从左至右left-right
        cssTemplate: function (data) {
          //生成css的模板文件
          var arr = [];
          data.sprites.forEach(function (sprite) {
            arr.push(
              ".icon-" +
                sprite.name +
                "{" +
                "background-image: url('" +
                sprite.escaped_image +
                "');" +
                "background-position: " +
                px2rem(sprite.px.offset_x) +
                " " +
                px2rem(sprite.px.offset_y) +
                ";" +
                "width:" +
                px2rem(sprite.px.width) +
                ";" +
                "height:" +
                px2rem(sprite.px.height) +
                ";" +
                "}\n"
            );
          });
          return arr.join("");
        },
      })
    )
    .pipe(gulp.dest("dist/")); //css和雪碧图生成的位置
});

function px2rem(value) {
  // -2256px
  let f = Number(String(value).replace(/px/, "")) / 100;
  let s = "rem";
  return f + s;
}
