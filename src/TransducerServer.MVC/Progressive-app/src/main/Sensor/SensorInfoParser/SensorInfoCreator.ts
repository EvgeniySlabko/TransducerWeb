import { FullSensorInfo, HoldingRegisters, SensorSK } from "../SensorDefinitions";
import { SensorWorker } from "../SensorWorker";
import { MasEdinicPopravok, MasEdIzm, MasEdRazm, MasNazvD, Mas_Mnog, Mas_NazvIzmVel, Mas_NomZn, Mas_TipMom, Mas_TipPressure, Mas_TipTenzo } from "./SensorsDefinitons";

let count = 0;
export async function GetFullSensorInfo(sensor: SensorWorker): Promise<FullSensorInfo> {
    if (sensor === null) throw "Sensor is null.";
    let sk = await sensor.GetSkInfo();
    let holdingRegisters = await sensor.GetHoldingRegisters();
    let fullSensorInfo = await CreateFullSensorInfo(sk, holdingRegisters);
    return fullSensorInfo;
}

//Формирует полную информацию о датчике
export async function CreateFullSensorInfo(serviceInfo: SensorSK, holdingRegisters: HoldingRegisters): Promise<FullSensorInfo> {
    //let fullInfo = new FullSensorInfo();
    let Index_Opis = serviceInfo.ID[0] >> 4; // Цифра 1 - старшая цифра
    let Tip_Datch = serviceInfo.ID[0] & 0x0f; // Цифра 2
    let Razmernost = serviceInfo.ID[1] >> 4; // Цифра 3
    let IndMnog = serviceInfo.ID[1] & 0x0f; // Цифра 4
    if (IndMnog > 9) IndMnog = 0;

    let isRotative = 0; //По умолчанию датчик не вращающийся
    let formatDigit = (n: number): string => {
        let hex = n.toString(16);
        if (hex.length < 2) hex = "0" + hex;
        return hex.toUpperCase();
    };
    let sensorId = formatDigit(serviceInfo.ID[0]) + formatDigit(serviceInfo.ID[1]) + formatDigit(serviceInfo.ID[2]);
    let typeString: string = "";

    let rotativeFromDecoderType = false;
    switch (Index_Opis) {
        case 0: {
            // Момент
            //................. Если датчик крутящего момента
            //................. Он может быть статический (МА20) или крутящийся (М40...)

            typeString = Mas_TipMom[Tip_Datch];
            //................. Если в конфигурации декодера есть угломер и кнопка управления
            if (holdingRegisters.flags.Pronometer && holdingRegisters.flags.ControlButton) {
                isRotative = 1; // Любой датчик крутящего момента с угломером и кнопкой в декодере
                rotativeFromDecoderType = true;
            }

            if (!rotativeFromDecoderType) {
                switch (Tip_Datch) {
                    case 0:
                        //............. Если Назначение датчика 0 и тип датчика 0 => MA20A
                        //............. Датчик МА20 с угломером и кнопкой управления
                        isRotative = 1;
                        break;
                    case 2:
                    case 4:
                    case 5:
                    case 6:
                    case 9:
                    case 10:
                        //............. Если тип датчика 2, 4, 5, 6, 9, 10 = 2 - вращающийся
                        isRotative = 2;
                        break;
                }
            }
            break;
        }

        case 3: {
            typeString = Mas_TipPressure[Tip_Datch];
            break;
        }
        case 7: {
            // Тензоусилитель
            typeString = Mas_TipTenzo[Tip_Datch];
            break;
        }
        default: {
            throw "Старый датчик";
            // 1 и 2 Сила и масса
            //................. Если это старый датчик (длина строки идентификатора = 5)
            //................. то СТ без номера (по старой классификации)
            //Len1 = strlen(PFBaseChannel->StrokaDatchikID);
            //if (Len1 === 5) {
            //AS = "СТ";
            //}
            //else {
            //if (Tip_Datch > 5 ) {
            //    Tip_Datch = 0;
            //}
            //AS = Mas_TipSila[Tip_Datch];
            //}
            //break;
            //throw "Invalid id"
        }
    }

    let nominalString = Mas_NomZn[IndMnog][Razmernost];

    /*
  if ((Index_Opis === 2) && (Razmernost === 7)){
      p = PPP.Pos('K');
      PPP.Delete(p,1);
      PPP = PPP+"T";
  }
  */

    let sensorType = typeString + nominalString;
    //................... названия датчика и основной измеряемой величины
    let name = MasNazvD[Index_Opis][0] + MasNazvD[Index_Opis][1];
    let unitname = MasNazvD[Index_Opis][1];
    //  strcpy(PSensorDescriptor->NaimDatchika, AS.c_str());
    //................... Формирование названия изм величины
    let unitNameStr = Mas_NazvIzmVel[Index_Opis];
    let valueName = unitNameStr;

    //................... Формирование названия единицы измерения
    //................... Определяем размерность измеряемого момента либо силы
    let stroks: string = "";
    let EdIzm = MasEdIzm[Index_Opis];
    let powerIndexName: number = 0;
    let mnogitel = Mas_Mnog[IndMnog];

    switch (Razmernost) {
        case 0:
            switch (Index_Opis) {
                //case 2:
                //stroks = "m"; break;
                case 7:
                    stroks = "n";
                    break;
                default:
                    stroks = "mk";
                    break;
            }
            powerIndexName = 0;
            break;
        case 1:
        case 2:
        case 3:
            switch (Index_Opis) {
                //case 2:
                //stroks = ""; break;
                case 7:
                    stroks = "mk";
                    break;
                default:
                    stroks = "m";
                    break;
            }
            powerIndexName = 1;
            break;
        case 4:
        case 5:
        case 6:
            switch (Index_Opis) {
                //case 2:
                //stroks = "k"; break;
                case 7:
                    stroks = "m";
                    break;
                default:
                    stroks = "";
                    break;
            }
            powerIndexName = 2;
            break;
        case 7:
        case 8:
        case 9:
            switch (Index_Opis) {
                //case 2:
                //stroks = ""; EdIzm = "T"; break;
                case 7:
                    stroks = "m";
                    break;
                default:
                    stroks = "k";
                    break;
            }
            powerIndexName = 3;
            break;
        case 10:
        case 11:
        case 12:
            switch (Index_Opis) {
                //case 2:
                //stroks = "k"; EdIzm = "T"; break;
                case 7:
                    stroks = "m";
                    break;
                default:
                    stroks = "M";
                    break;
            }
            powerIndexName = 4;
            break;
        case 13:
        case 14:
            switch (Index_Opis) {
                //case 2:
                //stroks = "mg"; break;
                case 7:
                    stroks = "m";
                    break;
                default:
                    stroks = "mk";
                    break;
            }
            powerIndexName = 0;
            break;
        case 15:
            switch (Index_Opis) {
                //case 2:
                //stroks = "mkg"; break;
                case 7:
                    stroks = "m";
                    break;
                default:
                    stroks = "mk";
                    break;
            }
            powerIndexName = 0;
            break;
    }

    let valueRatio: number;
    switch (stroks) {
        case "m":
            valueRatio = 0.001;
            break;
        case "k":
            valueRatio = 1000;
            break;
        case "M":
            valueRatio = 1000000;
            break;
        case "mk":
            valueRatio = 0.000001;
            break;
        default:
            valueRatio = 1;
    }
    let unitValueName = stroks + EdIzm;
    let maxSpeed = serviceInfo.MaxSpeed * 100;
    let index: number = 0;
    //................... Вычисление индекса для установки форматов
    switch (Razmernost) {
        case 0:
        case 3:
        case 6:
        case 9:
        case 12:
            index = 0;
            break;
        case 1:
        case 4:
        case 7:
        case 10:
        case 14:
            index = 1;
            break;
        case 2:
        case 5:
        case 8:
        case 11:
        case 13:
            index = 2;
            break;
        case 15:
            index = 3;
            break;
    }

    let popravka = MasEdinicPopravok[index];
    //................... Максимально допустимое значение основной измеряемой величины
    let MasEdRazmValue = MasEdRazm[index];
    let accuracy = MasEdRazm.toString().length - 1;
    let maxDopustBase = 1000 * mnogitel * MasEdRazmValue;
    //................. Максимально допустимое значение основной измеряемой величины
    let MaxValue = maxDopustBase;
    let MinValue = -maxDopustBase;
    //................... Вычисление степени 10 для округления при отображении
    //let PowerOfTen = CalculatePowerOfTen(fullInfo.MinValue, fullInfo.MaxValue);                //To DO

    //................... Установить признак "Есть идентификатор"
    //PFBaseChannel->EstID = true;
    //................... Сделать видимыми панели скорости и мощности
    //PFBaseChannel->SetSpeedVisible(PDecoderParametrs->IsRotative);

    let speedUnitsName: string = "";
    let powerName: string = "";
    let powerUnitsName: string = "";
    switch (isRotative) {
        case 0:
            break;
        case 1:
            /*
        PSensorDescriptor = &PDecoderParametrs->SensorDescriptors[6];
        PSensorDescriptor->ThereIs = true;
        if (PSensorDescriptor->MaxValue) {
          PSensorDescriptor->MaxValue = PFBaseChannel->MaxSkorVr;
        }
        else {
          PSensorDescriptor->MaxValue = 1000;
        }
        //................. Формирование названия скорости
        AS = Ures_RotationAngle;  
        
        strcpy(PSensorDescriptor->NaimDatchika, AS.c_str());
        strcpy(PSensorDescriptor->NaimValue, AS.c_str());
        strcpy(PSensorDescriptor->NaimEdIzm, "degree");
        */
            break;
        case 2:
            //PSensorDescriptor = &PDecoderParametrs->SensorDescriptors[6];
            //PSensorDescriptor->ThereIs = true;
            //PSensorDescriptor->MaxValue = PFBaseChannel->MaxSkorVr;
            //................. Формирование названия скорости
            //AS = Ures_Speed;
            //strcpy(PSensorDescriptor->NaimDatchika, AS.c_str());
            //strcpy(PSensorDescriptor->NaimValue, AS.c_str());
            speedUnitsName = "rpm";

            //PSensorDescriptor = &PDecoderParametrs->SensorDescriptors[7];
            //PSensorDescriptor->ThereIs = true;
            //TempFloat = (PFBaseChannel->MaxSkorVr * PFBaseChannel->MaxDopustBase[0] * M_PI)/30;
            //PSensorDescriptor->MaxValue = TempFloat;
            //PSensorDescriptor->MinValue = -TempFloat;
            //................. Формирование названия мощности
            powerName= "Мощность";
            //strcpy(PSensorDescriptor->NaimDatchika, AS.c_str());
            //strcpy(PSensorDescriptor->NaimValue, AS.c_str());
            //PDecoderParametrs->IndexRazmPowerIsx = IndexRazmPowerIsx;
            powerUnitsName = "W"; // единица измерения мощности
            //strcpy(PSensorDescriptor->NaimEdIzm, AS.c_str());
            break;
    }

    return {
        id: count++,
        Razmernost: Razmernost,
        Mnogitel: mnogitel,
        isRotative: isRotative,
        SensorId: sensorId,
        SensorType: sensorType,
        Name: name,
        Unitname: unitname,
        ValueName: valueName,
        valueRatio: valueRatio,
        UnitValueName: unitValueName,
        MaxSpeed: maxSpeed,
        Popravka: popravka,
        Accuracy: accuracy,
        MaxDopustBase: maxDopustBase,
        MaxValue: MaxValue,
        MinValue: MinValue,
        powerName: powerName,
        powerUnitsName: powerUnitsName,
        speedUnitsName: speedUnitsName,
    }
}
