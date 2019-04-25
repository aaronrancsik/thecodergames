<template>
    <v-container bg fill-height grid-list-md text-xs-center>
      <v-container bg fill-height grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs12 >
            <h1  class="display-2" id="h1">The Coder<span class="terminal">█</span> Games</h1>    
          </v-flex>
          <v-layout column  align-center justify-center fill-height>
          <v-flex xs1>
            <v-btn id="game" to="/craft" slot="activator" round  color="primary" large> Játék </v-btn>
          </v-flex>
          <v-flex xs1>
            <v-btn to="/registation" slot="activator" outline round color="primary" large> Regisztráció </v-btn>
          </v-flex>  
          </v-layout>
          
        </v-layout>
      </v-container>
    <div class="universe">
        <div  id="stars"></div>
        <div  id="stars2"></div>
        <div  id="stars3"></div>       
    </div>  
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HelloWorld extends Vue {
  message: string = 'Hello world !';
}
</script>
<style>
.terminal {
  font-size: 33px;
  position: relative;
  top: -16px;
 animation: blink 0.7s infinite step-end;
}

@keyframes blink {
  from, to { opacity: 0; }
  
  50% {opacity: 1;}
}
#h1, .display-2{
  font-family: 'Press Start 2P', cursive !important;
}
#game{
  color:black;
}
#app {
  background:transparent;
}
        .universe {
            background: #172126;
            z-index: -1;
            display: block;
            height: 100%;
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
        }
        #stars {
            width: 1px;
            height: 1px;
            background: transparent;
            box-shadow: 1418px 662px #FFF , 907px 1376px #FFF , 8px 1266px #FFF , 208px 223px #FFF , 1129px 1827px #FFF , 986px 1086px #FFF , 2000px 1359px #FFF , 895px 1269px #FFF , 4px 1791px #FFF , 857px 507px #FFF , 918px 1944px #FFF , 432px 889px #FFF , 1561px 6px #FFF , 1111px 160px #FFF , 9px 93px #FFF , 993px 422px #FFF , 1834px 316px #FFF , 851px 55px #FFF , 455px 1803px #FFF , 1634px 290px #FFF , 1980px 293px #FFF , 202px 261px #FFF , 1576px 440px #FFF , 1539px 1469px #FFF , 447px 272px #FFF , 307px 457px #FFF , 241px 1050px #FFF , 1242px 1666px #FFF , 1069px 1881px #FFF , 805px 1660px #FFF , 68px 1775px #FFF , 1468px 505px #FFF , 1806px 1497px #FFF , 925px 1792px #FFF , 1742px 390px #FFF , 1032px 1081px #FFF , 1353px 290px #FFF , 1202px 1025px #FFF , 845px 1416px #FFF , 608px 1420px #FFF , 1373px 582px #FFF , 1518px 319px #FFF , 963px 1728px #FFF , 1281px 1296px #FFF , 647px 1668px #FFF , 1981px 1147px #FFF , 884px 528px #FFF , 780px 525px #FFF , 448px 1071px #FFF , 535px 997px #FFF , 254px 1110px #FFF , 835px 1178px #FFF , 1036px 841px #FFF , 673px 1533px #FFF , 1548px 186px #FFF , 57px 1787px #FFF , 298px 982px #FFF , 1535px 1020px #FFF , 1165px 614px #FFF , 1820px 1504px #FFF , 1230px 1574px #FFF , 1147px 366px #FFF , 296px 898px #FFF , 1774px 519px #FFF , 1751px 1850px #FFF , 76px 710px #FFF , 1190px 871px #FFF , 613px 255px #FFF , 725px 93px #FFF , 1879px 1099px #FFF , 467px 1079px #FFF , 666px 787px #FFF , 462px 1983px #FFF , 509px 972px #FFF , 870px 1234px #FFF , 1110px 1643px #FFF , 1655px 750px #FFF , 1180px 1374px #FFF , 134px 93px #FFF , 353px 1839px #FFF , 240px 1142px #FFF , 1622px 866px #FFF , 466px 625px #FFF , 1084px 1657px #FFF , 1381px 727px #FFF , 949px 420px #FFF , 200px 325px #FFF , 1227px 930px #FFF , 850px 385px #FFF , 1434px 840px #FFF , 460px 1922px #FFF , 1504px 863px #FFF , 1360px 1278px #FFF , 552px 1708px #FFF , 80px 575px #FFF , 737px 770px #FFF , 45px 1102px #FFF , 933px 1425px #FFF , 150px 1642px #FFF , 1742px 1874px #FFF , 1490px 1965px #FFF , 501px 1976px #FFF , 1415px 9px #FFF , 323px 166px #FFF , 1615px 343px #FFF , 1711px 882px #FFF , 299px 278px #FFF , 1122px 753px #FFF , 1424px 1891px #FFF , 852px 419px #FFF , 1436px 313px #FFF , 114px 1282px #FFF , 53px 161px #FFF , 627px 649px #FFF , 1967px 1132px #FFF , 613px 374px #FFF , 1414px 1210px #FFF , 1604px 199px #FFF , 1116px 170px #FFF , 1305px 1403px #FFF , 156px 1287px #FFF , 1837px 902px #FFF , 1975px 1862px #FFF , 792px 28px #FFF , 1651px 244px #FFF , 1335px 1017px #FFF , 295px 1193px #FFF , 1363px 1775px #FFF , 949px 1043px #FFF , 1837px 1155px #FFF , 460px 1368px #FFF , 892px 1831px #FFF , 868px 1682px #FFF , 598px 119px #FFF , 271px 1820px #FFF , 1124px 942px #FFF , 1687px 374px #FFF , 733px 1557px #FFF , 1344px 59px #FFF , 72px 405px #FFF , 980px 290px #FFF , 346px 1727px #FFF , 1801px 414px #FFF , 856px 1052px #FFF , 1858px 6px #FFF , 1036px 1596px #FFF , 1491px 560px #FFF , 358px 1306px #FFF , 1647px 972px #FFF , 153px 1094px #FFF , 246px 1356px #FFF , 201px 427px #FFF , 77px 773px #FFF , 1002px 58px #FFF , 763px 1457px #FFF , 263px 974px #FFF , 1433px 1852px #FFF , 606px 775px #FFF , 484px 46px #FFF , 1972px 1087px #FFF , 3px 1128px #FFF , 1164px 1482px #FFF , 643px 319px #FFF , 1330px 204px #FFF , 1886px 623px #FFF , 793px 1064px #FFF , 1309px 50px #FFF , 76px 479px #FFF , 665px 693px #FFF , 1062px 1104px #FFF , 1850px 1968px #FFF , 100px 445px #FFF , 1207px 1168px #FFF , 1821px 118px #FFF , 521px 1080px #FFF , 1700px 1928px #FFF , 1847px 1233px #FFF , 1703px 989px #FFF , 670px 1953px #FFF , 1165px 507px #FFF , 785px 1896px #FFF , 811px 1478px #FFF , 13px 799px #FFF , 973px 448px #FFF , 1440px 557px #FFF , 996px 885px #FFF , 1417px 258px #FFF , 1797px 781px #FFF , 839px 1507px #FFF , 1701px 1060px #FFF , 1295px 310px #FFF , 8px 1335px #FFF , 1202px 708px #FFF , 862px 1972px #FFF , 840px 234px #FFF , 149px 1199px #FFF , 182px 799px #FFF , 762px 1279px #FFF , 217px 1015px #FFF , 1181px 942px #FFF , 1890px 407px #FFF , 232px 621px #FFF , 1763px 1930px #FFF , 877px 542px #FFF , 1582px 915px #FFF , 1950px 61px #FFF , 1060px 853px #FFF , 640px 1030px #FFF , 1399px 1722px #FFF , 1317px 1861px #FFF , 378px 1112px #FFF , 1908px 1473px #FFF , 714px 502px #FFF , 1411px 586px #FFF , 1848px 779px #FFF , 1407px 585px #FFF , 644px 1577px #FFF , 558px 89px #FFF , 1747px 647px #FFF , 1659px 863px #FFF , 978px 477px #FFF , 1320px 841px #FFF , 314px 1046px #FFF , 1915px 1970px #FFF , 1830px 100px #FFF , 1494px 907px #FFF , 59px 951px #FFF , 87px 1992px #FFF , 38px 68px #FFF , 832px 1389px #FFF , 1250px 578px #FFF , 1602px 1759px #FFF , 1418px 1900px #FFF , 1347px 1552px #FFF , 1177px 1547px #FFF , 1082px 1604px #FFF , 1711px 394px #FFF , 350px 565px #FFF , 1159px 1437px #FFF , 1938px 810px #FFF , 314px 233px #FFF , 345px 582px #FFF , 1118px 1296px #FFF , 628px 1244px #FFF , 468px 1219px #FFF , 1512px 402px #FFF , 1650px 1874px #FFF , 894px 1135px #FFF , 1809px 1879px #FFF , 1419px 1877px #FFF , 1945px 1400px #FFF , 880px 1637px #FFF , 596px 272px #FFF , 39px 657px #FFF , 464px 958px #FFF , 703px 1578px #FFF , 196px 1515px #FFF , 1087px 977px #FFF , 48px 940px #FFF , 806px 57px #FFF , 907px 370px #FFF , 777px 430px #FFF , 1105px 522px #FFF , 1040px 1003px #FFF , 1303px 1947px #FFF , 1993px 1060px #FFF , 1036px 1410px #FFF , 1637px 1868px #FFF , 1575px 1927px #FFF , 963px 104px #FFF , 411px 1263px #FFF , 693px 1218px #FFF , 1882px 1307px #FFF , 1987px 25px #FFF , 647px 1918px #FFF , 397px 915px #FFF , 765px 142px #FFF , 127px 479px #FFF , 647px 1517px #FFF , 1857px 2000px #FFF , 356px 1418px #FFF , 878px 1356px #FFF , 1593px 1011px #FFF , 1014px 1679px #FFF , 590px 844px #FFF , 1943px 101px #FFF , 1106px 503px #FFF , 603px 1214px #FFF , 290px 768px #FFF , 56px 958px #FFF , 1540px 903px #FFF , 802px 1894px #FFF , 1441px 839px #FFF , 1280px 221px #FFF , 508px 683px #FFF , 1990px 1729px #FFF , 441px 1005px #FFF , 1100px 1724px #FFF , 30px 370px #FFF , 1955px 541px #FFF , 490px 1120px #FFF , 1703px 600px #FFF , 1176px 510px #FFF , 35px 438px #FFF , 1790px 823px #FFF , 252px 513px #FFF , 596px 353px #FFF , 655px 1051px #FFF , 1134px 1979px #FFF , 494px 1740px #FFF , 835px 43px #FFF , 1529px 255px #FFF , 894px 1835px #FFF , 880px 57px #FFF , 1152px 848px #FFF , 794px 1832px #FFF , 1712px 1494px #FFF , 701px 42px #FFF , 505px 252px #FFF , 1083px 1088px #FFF , 51px 1960px #FFF , 1067px 1425px #FFF , 377px 1593px #FFF , 926px 1449px #FFF , 1483px 830px #FFF , 1343px 1349px #FFF , 1515px 1400px #FFF , 1430px 940px #FFF , 1780px 1268px #FFF , 1666px 1013px #FFF , 413px 1865px #FFF , 243px 1468px #FFF , 1368px 11px #FFF , 59px 823px #FFF , 1022px 1957px #FFF , 1204px 1579px #FFF , 1913px 910px #FFF , 1962px 618px #FFF , 255px 624px #FFF , 4px 427px #FFF , 1347px 662px #FFF , 1094px 565px #FFF , 1567px 1975px #FFF , 1120px 1098px #FFF , 764px 1217px #FFF , 792px 417px #FFF , 1127px 1373px #FFF , 52px 1540px #FFF , 5px 1238px #FFF , 1590px 183px #FFF;
            animation: animStar 600s linear infinite; }
        #stars:after {
            content: " ";
            position: absolute;
            top: 2000px;
            width: 1px;
            height: 1px;
            background: transparent;
            box-shadow: 1418px 662px #FFF , 907px 1376px #FFF , 8px 1266px #FFF , 208px 223px #FFF , 1129px 1827px #FFF , 986px 1086px #FFF , 2000px 1359px #FFF , 895px 1269px #FFF , 4px 1791px #FFF , 857px 507px #FFF , 918px 1944px #FFF , 432px 889px #FFF , 1561px 6px #FFF , 1111px 160px #FFF , 9px 93px #FFF , 993px 422px #FFF , 1834px 316px #FFF , 851px 55px #FFF , 455px 1803px #FFF , 1634px 290px #FFF , 1980px 293px #FFF , 202px 261px #FFF , 1576px 440px #FFF , 1539px 1469px #FFF , 447px 272px #FFF , 307px 457px #FFF , 241px 1050px #FFF , 1242px 1666px #FFF , 1069px 1881px #FFF , 805px 1660px #FFF , 68px 1775px #FFF , 1468px 505px #FFF , 1806px 1497px #FFF , 925px 1792px #FFF , 1742px 390px #FFF , 1032px 1081px #FFF , 1353px 290px #FFF , 1202px 1025px #FFF , 845px 1416px #FFF , 608px 1420px #FFF , 1373px 582px #FFF , 1518px 319px #FFF , 963px 1728px #FFF , 1281px 1296px #FFF , 647px 1668px #FFF , 1981px 1147px #FFF , 884px 528px #FFF , 780px 525px #FFF , 448px 1071px #FFF , 535px 997px #FFF , 254px 1110px #FFF , 835px 1178px #FFF , 1036px 841px #FFF , 673px 1533px #FFF , 1548px 186px #FFF , 57px 1787px #FFF , 298px 982px #FFF , 1535px 1020px #FFF , 1165px 614px #FFF , 1820px 1504px #FFF , 1230px 1574px #FFF , 1147px 366px #FFF , 296px 898px #FFF , 1774px 519px #FFF , 1751px 1850px #FFF , 76px 710px #FFF , 1190px 871px #FFF , 613px 255px #FFF , 725px 93px #FFF , 1879px 1099px #FFF , 467px 1079px #FFF , 666px 787px #FFF , 462px 1983px #FFF , 509px 972px #FFF , 870px 1234px #FFF , 1110px 1643px #FFF , 1655px 750px #FFF , 1180px 1374px #FFF , 134px 93px #FFF , 353px 1839px #FFF , 240px 1142px #FFF , 1622px 866px #FFF , 466px 625px #FFF , 1084px 1657px #FFF , 1381px 727px #FFF , 949px 420px #FFF , 200px 325px #FFF , 1227px 930px #FFF , 850px 385px #FFF , 1434px 840px #FFF , 460px 1922px #FFF , 1504px 863px #FFF , 1360px 1278px #FFF , 552px 1708px #FFF , 80px 575px #FFF , 737px 770px #FFF , 45px 1102px #FFF , 933px 1425px #FFF , 150px 1642px #FFF , 1742px 1874px #FFF , 1490px 1965px #FFF , 501px 1976px #FFF , 1415px 9px #FFF , 323px 166px #FFF , 1615px 343px #FFF , 1711px 882px #FFF , 299px 278px #FFF , 1122px 753px #FFF , 1424px 1891px #FFF , 852px 419px #FFF , 1436px 313px #FFF , 114px 1282px #FFF , 53px 161px #FFF , 627px 649px #FFF , 1967px 1132px #FFF , 613px 374px #FFF , 1414px 1210px #FFF , 1604px 199px #FFF , 1116px 170px #FFF , 1305px 1403px #FFF , 156px 1287px #FFF , 1837px 902px #FFF , 1975px 1862px #FFF , 792px 28px #FFF , 1651px 244px #FFF , 1335px 1017px #FFF , 295px 1193px #FFF , 1363px 1775px #FFF , 949px 1043px #FFF , 1837px 1155px #FFF , 460px 1368px #FFF , 892px 1831px #FFF , 868px 1682px #FFF , 598px 119px #FFF , 271px 1820px #FFF , 1124px 942px #FFF , 1687px 374px #FFF , 733px 1557px #FFF , 1344px 59px #FFF , 72px 405px #FFF , 980px 290px #FFF , 346px 1727px #FFF , 1801px 414px #FFF , 856px 1052px #FFF , 1858px 6px #FFF , 1036px 1596px #FFF , 1491px 560px #FFF , 358px 1306px #FFF , 1647px 972px #FFF , 153px 1094px #FFF , 246px 1356px #FFF , 201px 427px #FFF , 77px 773px #FFF , 1002px 58px #FFF , 763px 1457px #FFF , 263px 974px #FFF , 1433px 1852px #FFF , 606px 775px #FFF , 484px 46px #FFF , 1972px 1087px #FFF , 3px 1128px #FFF , 1164px 1482px #FFF , 643px 319px #FFF , 1330px 204px #FFF , 1886px 623px #FFF , 793px 1064px #FFF , 1309px 50px #FFF , 76px 479px #FFF , 665px 693px #FFF , 1062px 1104px #FFF , 1850px 1968px #FFF , 100px 445px #FFF , 1207px 1168px #FFF , 1821px 118px #FFF , 521px 1080px #FFF , 1700px 1928px #FFF , 1847px 1233px #FFF , 1703px 989px #FFF , 670px 1953px #FFF , 1165px 507px #FFF , 785px 1896px #FFF , 811px 1478px #FFF , 13px 799px #FFF , 973px 448px #FFF , 1440px 557px #FFF , 996px 885px #FFF , 1417px 258px #FFF , 1797px 781px #FFF , 839px 1507px #FFF , 1701px 1060px #FFF , 1295px 310px #FFF , 8px 1335px #FFF , 1202px 708px #FFF , 862px 1972px #FFF , 840px 234px #FFF , 149px 1199px #FFF , 182px 799px #FFF , 762px 1279px #FFF , 217px 1015px #FFF , 1181px 942px #FFF , 1890px 407px #FFF , 232px 621px #FFF , 1763px 1930px #FFF , 877px 542px #FFF , 1582px 915px #FFF , 1950px 61px #FFF , 1060px 853px #FFF , 640px 1030px #FFF , 1399px 1722px #FFF , 1317px 1861px #FFF , 378px 1112px #FFF , 1908px 1473px #FFF , 714px 502px #FFF , 1411px 586px #FFF , 1848px 779px #FFF , 1407px 585px #FFF , 644px 1577px #FFF , 558px 89px #FFF , 1747px 647px #FFF , 1659px 863px #FFF , 978px 477px #FFF , 1320px 841px #FFF , 314px 1046px #FFF , 1915px 1970px #FFF , 1830px 100px #FFF , 1494px 907px #FFF , 59px 951px #FFF , 87px 1992px #FFF , 38px 68px #FFF , 832px 1389px #FFF , 1250px 578px #FFF , 1602px 1759px #FFF , 1418px 1900px #FFF , 1347px 1552px #FFF , 1177px 1547px #FFF , 1082px 1604px #FFF , 1711px 394px #FFF , 350px 565px #FFF , 1159px 1437px #FFF , 1938px 810px #FFF , 314px 233px #FFF , 345px 582px #FFF , 1118px 1296px #FFF , 628px 1244px #FFF , 468px 1219px #FFF , 1512px 402px #FFF , 1650px 1874px #FFF , 894px 1135px #FFF , 1809px 1879px #FFF , 1419px 1877px #FFF , 1945px 1400px #FFF , 880px 1637px #FFF , 596px 272px #FFF , 39px 657px #FFF , 464px 958px #FFF , 703px 1578px #FFF , 196px 1515px #FFF , 1087px 977px #FFF , 48px 940px #FFF , 806px 57px #FFF , 907px 370px #FFF , 777px 430px #FFF , 1105px 522px #FFF , 1040px 1003px #FFF , 1303px 1947px #FFF , 1993px 1060px #FFF , 1036px 1410px #FFF , 1637px 1868px #FFF , 1575px 1927px #FFF , 963px 104px #FFF , 411px 1263px #FFF , 693px 1218px #FFF , 1882px 1307px #FFF , 1987px 25px #FFF , 647px 1918px #FFF , 397px 915px #FFF , 765px 142px #FFF , 127px 479px #FFF , 647px 1517px #FFF , 1857px 2000px #FFF , 356px 1418px #FFF , 878px 1356px #FFF , 1593px 1011px #FFF , 1014px 1679px #FFF , 590px 844px #FFF , 1943px 101px #FFF , 1106px 503px #FFF , 603px 1214px #FFF , 290px 768px #FFF , 56px 958px #FFF , 1540px 903px #FFF , 802px 1894px #FFF , 1441px 839px #FFF , 1280px 221px #FFF , 508px 683px #FFF , 1990px 1729px #FFF , 441px 1005px #FFF , 1100px 1724px #FFF , 30px 370px #FFF , 1955px 541px #FFF , 490px 1120px #FFF , 1703px 600px #FFF , 1176px 510px #FFF , 35px 438px #FFF , 1790px 823px #FFF , 252px 513px #FFF , 596px 353px #FFF , 655px 1051px #FFF , 1134px 1979px #FFF , 494px 1740px #FFF , 835px 43px #FFF , 1529px 255px #FFF , 894px 1835px #FFF , 880px 57px #FFF , 1152px 848px #FFF , 794px 1832px #FFF , 1712px 1494px #FFF , 701px 42px #FFF , 505px 252px #FFF , 1083px 1088px #FFF , 51px 1960px #FFF , 1067px 1425px #FFF , 377px 1593px #FFF , 926px 1449px #FFF , 1483px 830px #FFF , 1343px 1349px #FFF , 1515px 1400px #FFF , 1430px 940px #FFF , 1780px 1268px #FFF , 1666px 1013px #FFF , 413px 1865px #FFF , 243px 1468px #FFF , 1368px 11px #FFF , 59px 823px #FFF , 1022px 1957px #FFF , 1204px 1579px #FFF , 1913px 910px #FFF , 1962px 618px #FFF , 255px 624px #FFF , 4px 427px #FFF , 1347px 662px #FFF , 1094px 565px #FFF , 1567px 1975px #FFF , 1120px 1098px #FFF , 764px 1217px #FFF , 792px 417px #FFF , 1127px 1373px #FFF , 52px 1540px #FFF , 5px 1238px #FFF , 1590px 183px #FFF; }

        #stars2 {
            width: 2px;
            height: 2px;
            background: transparent;
            box-shadow: 265px 1563px #FFF , 305px 620px #FFF , 1017px 1612px #FFF , 1479px 849px #FFF , 1952px 1741px #FFF , 1948px 1601px #FFF , 319px 461px #FFF , 1884px 217px #FFF , 1793px 1789px #FFF , 1915px 689px #FFF , 232px 1077px #FFF , 1439px 1895px #FFF , 120px 1085px #FFF , 1722px 152px #FFF , 1593px 1808px #FFF , 1153px 1577px #FFF , 1671px 1813px #FFF , 408px 821px #FFF , 405px 788px #FFF , 1427px 1752px #FFF , 559px 1041px #FFF , 1619px 1013px #FFF , 1277px 577px #FFF , 1401px 1575px #FFF , 1263px 1306px #FFF , 71px 604px #FFF , 878px 253px #FFF , 1478px 1799px #FFF , 692px 815px #FFF , 435px 1394px #FFF , 1079px 176px #FFF , 159px 1177px #FFF , 1026px 1668px #FFF , 287px 663px #FFF , 516px 161px #FFF , 639px 709px #FFF , 292px 1021px #FFF , 1654px 1038px #FFF , 1709px 120px #FFF , 212px 954px #FFF , 1931px 469px #FFF , 396px 975px #FFF , 1589px 505px #FFF , 1600px 296px #FFF , 1253px 877px #FFF , 709px 88px #FFF , 577px 1414px #FFF , 1680px 1866px #FFF , 1887px 109px #FFF , 293px 1849px #FFF , 759px 251px #FFF , 1868px 715px #FFF , 407px 1855px #FFF , 1980px 1014px #FFF , 1472px 1148px #FFF , 1424px 1590px #FFF , 583px 1629px #FFF , 1652px 850px #FFF , 1391px 1333px #FFF , 373px 1604px #FFF , 236px 1639px #FFF , 1214px 972px #FFF , 1771px 431px #FFF , 1925px 1553px #FFF , 1117px 1458px #FFF , 1946px 1467px #FFF , 904px 1828px #FFF , 1294px 1248px #FFF , 317px 1431px #FFF , 1466px 501px #FFF , 727px 1886px #FFF , 935px 1369px #FFF , 589px 919px #FFF , 1454px 518px #FFF , 891px 601px #FFF , 1461px 1830px #FFF , 256px 322px #FFF , 414px 716px #FFF , 828px 860px #FFF , 1475px 961px #FFF , 668px 171px #FFF , 731px 506px #FFF , 258px 1844px #FFF , 551px 477px #FFF , 541px 463px #FFF , 1597px 1746px #FFF , 257px 1726px #FFF , 469px 1695px #FFF , 736px 1804px #FFF , 1952px 24px #FFF , 1005px 1157px #FFF , 1498px 1128px #FFF , 1716px 1725px #FFF , 1757px 135px #FFF , 550px 1086px #FFF , 392px 1972px #FFF , 1320px 815px #FFF , 63px 59px #FFF , 1126px 1476px #FFF , 929px 1828px #FFF;
            animation: animStar 800s linear infinite; }
        #stars2:after {
            content: " ";
            position: absolute;
            top: 2000px;
            width: 2px;
            height: 2px;
            background: transparent;
            box-shadow: 265px 1563px #FFF , 305px 620px #FFF , 1017px 1612px #FFF , 1479px 849px #FFF , 1952px 1741px #FFF , 1948px 1601px #FFF , 319px 461px #FFF , 1884px 217px #FFF , 1793px 1789px #FFF , 1915px 689px #FFF , 232px 1077px #FFF , 1439px 1895px #FFF , 120px 1085px #FFF , 1722px 152px #FFF , 1593px 1808px #FFF , 1153px 1577px #FFF , 1671px 1813px #FFF , 408px 821px #FFF , 405px 788px #FFF , 1427px 1752px #FFF , 559px 1041px #FFF , 1619px 1013px #FFF , 1277px 577px #FFF , 1401px 1575px #FFF , 1263px 1306px #FFF , 71px 604px #FFF , 878px 253px #FFF , 1478px 1799px #FFF , 692px 815px #FFF , 435px 1394px #FFF , 1079px 176px #FFF , 159px 1177px #FFF , 1026px 1668px #FFF , 287px 663px #FFF , 516px 161px #FFF , 639px 709px #FFF , 292px 1021px #FFF , 1654px 1038px #FFF , 1709px 120px #FFF , 212px 954px #FFF , 1931px 469px #FFF , 396px 975px #FFF , 1589px 505px #FFF , 1600px 296px #FFF , 1253px 877px #FFF , 709px 88px #FFF , 577px 1414px #FFF , 1680px 1866px #FFF , 1887px 109px #FFF , 293px 1849px #FFF , 759px 251px #FFF , 1868px 715px #FFF , 407px 1855px #FFF , 1980px 1014px #FFF , 1472px 1148px #FFF , 1424px 1590px #FFF , 583px 1629px #FFF , 1652px 850px #FFF , 1391px 1333px #FFF , 373px 1604px #FFF , 236px 1639px #FFF , 1214px 972px #FFF , 1771px 431px #FFF , 1925px 1553px #FFF , 1117px 1458px #FFF , 1946px 1467px #FFF , 904px 1828px #FFF , 1294px 1248px #FFF , 317px 1431px #FFF , 1466px 501px #FFF , 727px 1886px #FFF , 935px 1369px #FFF , 589px 919px #FFF , 1454px 518px #FFF , 891px 601px #FFF , 1461px 1830px #FFF , 256px 322px #FFF , 414px 716px #FFF , 828px 860px #FFF , 1475px 961px #FFF , 668px 171px #FFF , 731px 506px #FFF , 258px 1844px #FFF , 551px 477px #FFF , 541px 463px #FFF , 1597px 1746px #FFF , 257px 1726px #FFF , 469px 1695px #FFF , 736px 1804px #FFF , 1952px 24px #FFF , 1005px 1157px #FFF , 1498px 1128px #FFF , 1716px 1725px #FFF , 1757px 135px #FFF , 550px 1086px #FFF , 392px 1972px #FFF , 1320px 815px #FFF , 63px 59px #FFF , 1126px 1476px #FFF , 929px 1828px #FFF; }

        /* #stars3 {
            width: 3px;
            height: 3px;
            background: transparent;
            box-shadow: 694px 533px #FFF , 357px 1534px #FFF , 891px 523px #FFF , 1890px 1832px #FFF , 1793px 500px #FFF , 1906px 1856px #FFF , 1462px 1648px #FFF , 783px 672px #FFF , 594px 1656px #FFF , 807px 902px #FFF , 445px 1896px #FFF , 720px 1678px #FFF , 85px 1466px #FFF , 1790px 348px #FFF , 1642px 886px #FFF , 1517px 1197px #FFF , 1902px 1937px #FFF , 1669px 1417px #FFF , 1684px 1939px #FFF , 1315px 181px #FFF , 460px 220px #FFF , 305px 1413px #FFF , 1762px 865px #FFF , 1680px 316px #FFF , 1649px 779px #FFF , 1964px 1531px #FFF , 1603px 1736px #FFF , 377px 893px #FFF , 959px 244px #FFF , 1844px 439px #FFF , 402px 1427px #FFF , 395px 70px #FFF , 1332px 1071px #FFF , 1511px 1575px #FFF , 106px 1774px #FFF , 1518px 1193px #FFF , 1114px 1179px #FFF , 1023px 553px #FFF , 1077px 729px #FFF , 675px 627px #FFF , 1851px 1376px #FFF , 1243px 1914px #FFF , 425px 383px #FFF , 1738px 1496px #FFF , 671px 1365px #FFF , 1864px 312px #FFF , 102px 1191px #FFF , 1159px 1691px #FFF , 1123px 1570px #FFF , 264px 1324px #FFF;
            animation: animStar 1200s linear infinite; }
        #stars3:after {
            content: " ";
            position: absolute;
            top: 2000px;
            width: 3px;
            height: 3px;
            background: transparent;
            box-shadow: 694px 533px #FFF , 357px 1534px #FFF , 891px 523px #FFF , 1890px 1832px #FFF , 1793px 500px #FFF , 1906px 1856px #FFF , 1462px 1648px #FFF , 783px 672px #FFF , 594px 1656px #FFF , 807px 902px #FFF , 445px 1896px #FFF , 720px 1678px #FFF , 85px 1466px #FFF , 1790px 348px #FFF , 1642px 886px #FFF , 1517px 1197px #FFF , 1902px 1937px #FFF , 1669px 1417px #FFF , 1684px 1939px #FFF , 1315px 181px #FFF , 460px 220px #FFF , 305px 1413px #FFF , 1762px 865px #FFF , 1680px 316px #FFF , 1649px 779px #FFF , 1964px 1531px #FFF , 1603px 1736px #FFF , 377px 893px #FFF , 959px 244px #FFF , 1844px 439px #FFF , 402px 1427px #FFF , 395px 70px #FFF , 1332px 1071px #FFF , 1511px 1575px #FFF , 106px 1774px #FFF , 1518px 1193px #FFF , 1114px 1179px #FFF , 1023px 553px #FFF , 1077px 729px #FFF , 675px 627px #FFF , 1851px 1376px #FFF , 1243px 1914px #FFF , 425px 383px #FFF , 1738px 1496px #FFF , 671px 1365px #FFF , 1864px 312px #FFF , 102px 1191px #FFF , 1159px 1691px #FFF , 1123px 1570px #FFF , 264px 1324px #FFF; } */

            @keyframes animStar {
            from {
                transform: translateY(0px); }
            to {
                transform: translateY(-3900px); } }
    </style>