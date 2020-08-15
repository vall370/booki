import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
export default function Svgtest() {
    const loginbutton = `<svg width="122" height="34" viewBox="0 0 122 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="121.395" height="33.4884" rx="16.7442" fill="#2BB951"/>
    <path d="M35.1907 20.8768H40.1269V22H33.81V11.5839H35.1907V20.8768ZM41.3972 18.0582C41.3972 17.2999 41.545 16.6179 41.8407 16.0122C42.1412 15.4065 42.5561 14.9391 43.0855 14.61C43.6197 14.281 44.2277 14.1164 44.9097 14.1164C45.9638 14.1164 46.8151 14.4813 47.4637 15.211C48.1171 15.9407 48.4438 16.9112 48.4438 18.1226V18.2156C48.4438 18.9691 48.2983 19.6464 48.0074 20.2473C47.7212 20.8435 47.3087 21.3085 46.7698 21.6423C46.2356 21.9762 45.6204 22.1431 44.9241 22.1431C43.8748 22.1431 43.0235 21.7782 42.3701 21.0485C41.7215 20.3188 41.3972 19.3531 41.3972 18.1512V18.0582ZM42.7278 18.2156C42.7278 19.0741 42.9257 19.7632 43.3216 20.2831C43.7222 20.8029 44.2564 21.0628 44.9241 21.0628C45.5965 21.0628 46.1307 20.8005 46.5265 20.2759C46.9224 19.7465 47.1203 19.0073 47.1203 18.0582C47.1203 17.2093 46.9176 16.5225 46.5122 15.9979C46.1116 15.4685 45.5774 15.2038 44.9097 15.2038C44.2564 15.2038 43.7294 15.4637 43.3287 15.9836C42.9281 16.5034 42.7278 17.2474 42.7278 18.2156ZM50.0503 18.0654C50.0503 16.8587 50.3293 15.9001 50.8873 15.1895C51.4453 14.4741 52.1846 14.1164 53.105 14.1164C54.0494 14.1164 54.7862 14.4503 55.3156 15.118L55.38 14.2595H56.589V21.814C56.589 22.8155 56.2909 23.6049 55.6947 24.1819C55.1034 24.759 54.3069 25.0476 53.3053 25.0476C52.7473 25.0476 52.2013 24.9283 51.6671 24.6899C51.1329 24.4514 50.7252 24.1247 50.4438 23.7098L51.1306 22.9157C51.6981 23.6168 52.392 23.9673 53.2123 23.9673C53.8562 23.9673 54.357 23.7861 54.7147 23.4236C55.0771 23.0612 55.2584 22.5508 55.2584 21.8927V21.2274C54.729 21.8378 54.0064 22.1431 53.0907 22.1431C52.1846 22.1431 51.4501 21.7782 50.8873 21.0485C50.3293 20.3188 50.0503 19.3244 50.0503 18.0654ZM51.381 18.2156C51.381 19.0884 51.5598 19.7751 51.9175 20.2759C52.2752 20.7719 52.776 21.0199 53.4198 21.0199C54.2544 21.0199 54.8673 20.6408 55.2584 19.8824V16.3484C54.853 15.6092 54.2449 15.2396 53.4341 15.2396C52.7903 15.2396 52.2871 15.49 51.9246 15.9907C51.5622 16.4915 51.381 17.2331 51.381 18.2156ZM58.5389 18.0654C58.5389 16.8587 58.8179 15.9001 59.3759 15.1895C59.9339 14.4741 60.6732 14.1164 61.5936 14.1164C62.538 14.1164 63.2748 14.4503 63.8042 15.118L63.8686 14.2595H65.0776V21.814C65.0776 22.8155 64.7795 23.6049 64.1833 24.1819C63.592 24.759 62.7955 25.0476 61.7939 25.0476C61.2359 25.0476 60.6899 24.9283 60.1557 24.6899C59.6215 24.4514 59.2138 24.1247 58.9324 23.7098L59.6192 22.9157C60.1867 23.6168 60.8806 23.9673 61.7009 23.9673C62.3448 23.9673 62.8456 23.7861 63.2033 23.4236C63.5657 23.0612 63.747 22.5508 63.747 21.8927V21.2274C63.2176 21.8378 62.495 22.1431 61.5793 22.1431C60.6732 22.1431 59.9387 21.7782 59.3759 21.0485C58.8179 20.3188 58.5389 19.3244 58.5389 18.0654ZM59.8696 18.2156C59.8696 19.0884 60.0484 19.7751 60.4061 20.2759C60.7638 20.7719 61.2646 21.0199 61.9084 21.0199C62.743 21.0199 63.3559 20.6408 63.747 19.8824V16.3484C63.3416 15.6092 62.7335 15.2396 61.9227 15.2396C61.2789 15.2396 60.7757 15.49 60.4132 15.9907C60.0508 16.4915 59.8696 17.2331 59.8696 18.2156ZM72.1211 22C72.0448 21.8474 71.9828 21.5755 71.9351 21.1845C71.3199 21.8235 70.5854 22.1431 69.7317 22.1431C68.9686 22.1431 68.3415 21.9285 67.8502 21.4992C67.3638 21.0652 67.1205 20.5168 67.1205 19.8538C67.1205 19.0478 67.4258 18.4231 68.0362 17.9795C68.6515 17.5312 69.5147 17.307 70.6259 17.307H71.9136V16.699C71.9136 16.2364 71.7753 15.8691 71.4987 15.5973C71.2221 15.3207 70.8143 15.1823 70.2754 15.1823C69.8032 15.1823 69.4074 15.3016 69.0878 15.54C68.7683 15.7785 68.6085 16.067 68.6085 16.4057H67.2779C67.2779 16.0193 67.4138 15.6473 67.6857 15.2897C67.9623 14.9272 68.3343 14.641 68.8017 14.4312C69.2738 14.2213 69.7913 14.1164 70.3541 14.1164C71.2459 14.1164 71.9446 14.3406 72.4502 14.7889C72.9557 15.2324 73.218 15.8453 73.2371 16.6274V20.1901C73.2371 20.9007 73.3277 21.4658 73.5089 21.8855V22H72.1211ZM69.9248 20.9913C70.3398 20.9913 70.7332 20.884 71.1052 20.6694C71.4772 20.4548 71.7467 20.1758 71.9136 19.8324V18.2442H70.8763C69.2548 18.2442 68.444 18.7187 68.444 19.6678C68.444 20.0828 68.5823 20.4071 68.8589 20.6408C69.1355 20.8745 69.4908 20.9913 69.9248 20.9913ZM80.9071 22H79.5836V14.2595H80.9071V22ZM79.4763 12.2063C79.4763 11.9917 79.5407 11.8105 79.6695 11.6626C79.803 11.5148 79.9985 11.4409 80.2561 11.4409C80.5136 11.4409 80.7092 11.5148 80.8427 11.6626C80.9762 11.8105 81.043 11.9917 81.043 12.2063C81.043 12.4209 80.9762 12.5998 80.8427 12.7429C80.7092 12.8859 80.5136 12.9575 80.2561 12.9575C79.9985 12.9575 79.803 12.8859 79.6695 12.7429C79.5407 12.5998 79.4763 12.4209 79.4763 12.2063ZM84.5454 14.2595L84.5883 15.2324C85.1797 14.4884 85.9523 14.1164 86.9061 14.1164C88.542 14.1164 89.3671 15.0393 89.3814 16.885V22H88.0579V16.8778C88.0531 16.3198 87.9244 15.9073 87.6716 15.6402C87.4236 15.3731 87.0349 15.2396 86.5055 15.2396C86.0763 15.2396 85.6995 15.354 85.3752 15.583C85.0509 15.8119 84.7981 16.1123 84.6169 16.4844V22H83.2934V14.2595H84.5454Z" fill="white"/>
    <path d="M103.165 25.13L104.935 26.9L114.835 17L104.935 7.10001L103.165 8.87001L111.295 17L103.165 25.13V25.13Z" fill="white"/>
    </svg>`


    const LoginButtonSvg = () => <SvgXml xml={loginbutton} width='50%' height='50%' />
    return <LoginButtonSvg />;
}
