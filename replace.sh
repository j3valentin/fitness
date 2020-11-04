#git co -- $BUILD_PATH/tools/config/seed-advanced.config.ts
perl -p -i -e "s/ \: \'\/\'\;/ \: \'\/fitness-ng\/\'\;/g" $BUILD_PATH/tools/config/seed-advanced.config.ts
#echo 'path' && echo $BUILD_PATH
