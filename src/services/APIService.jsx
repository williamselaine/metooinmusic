import { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";

const usePins = (triggerUpdate) => {
  const [pins, setPins] = useState([]);

  useEffect(() => {
    let _pins;
    const getPins = async () => {
      const docRef = doc(db, "api", "pins");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        _pins = docSnap.data();
      } else {
        // docSnap.data() will be undefined in this case
      }
      setPins(_pins);
    };
    getPins();
  }, [triggerUpdate]);
  return pins;
}

const useFlags = (triggerUpdate) => {
    const [flags, setFlags] = useState([]);

    useEffect(() => {
      const _flags = [];
      const getFlags = async () => {
        const docRef = doc(db, "api", "pins");
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const _pins = docSnap.data();
          try {
            _pins.hochschulen.forEach(pin => {
                let flagIndex = 0;
                if(pin.flags > 0) {
                    while(flagIndex < pin.flags) {
                        const offsets = getPinOffsets(pin.flags, flagIndex);
                        _flags.push({ name: pin.name, latitude: pin.latitude + offsets.latitude, longitude: pin.longitude + offsets.longitude });
                        flagIndex++;
                    }
                }
              })
              setFlags(_flags);
          } catch(e) {
            console.error(e);
          }
        } else {
          // docSnap.data() will be undefined in this case
          console.error("No such document!");
        }
      };
      getFlags();
    }, [triggerUpdate]);
    return flags;
};

const submitFlag = async (_school) => {
  const docsnap = await getDoc(doc(db, "api", "pins"));

  if (docsnap.exists()) {
    // increment the selected school
    const schools = docsnap.data();
    schools?.hochschulen.forEach(school => {
      if(school.name === _school) {
        school.flags++;
      }
    })
    await setDoc(doc(db, "api", "pins"), schools);
    return true;
  } else {
    // docSnap.data() will be undefined in this case
    return false;
  }
}

export { usePins, useFlags, submitFlag };


// Helpers

const getPinOffsets = (flags, flagIndex) => {
  if(flags <= 9) {
    return pinOffsets[flags][flagIndex];
  }
  return {
    latitude: 0 - Math.random() / 200 * flags,
    longitude: 0.25 - Math.random() / 100 * flags
  }
}

const pinOffsets = {
    1: [{ latitude: 0, longitude: 0.3}],
    2: [{ latitude: -0.05, longitude: 0.3}, { latitude: 0.05, longitude: 0.15}],
    3: [{ latitude: -0.05, longitude: 0.3}, { latitude: 0.01, longitude: 0.1}, { latitude: 0.08, longitude: 0.3}],
    4: [{ latitude: -0.05, longitude: 0.3}, { latitude: 0.05, longitude: 0.15}, { latitude: 0.05, longitude: 0.3}, { latitude: -0.05, longitude: 0.15}],
    5: [{ latitude: -0.05, longitude: 0.3}, { latitude: 0.01, longitude: 0.1}, { latitude: 0.08, longitude: 0.3}, { latitude: -0.05, longitude: 0.2}, { latitude: 0.08, longitude: 0.2}],
    6: [{ latitude: -0.05, longitude: 0.3}, { latitude: 0.01, longitude: 0.1}, { latitude: 0.08, longitude: 0.3}, { latitude: -0.05, longitude: 0.2}, { latitude: 0.01, longitude: 0.2}, { latitude: 0.08, longitude: 0.2}],
    7: [{ latitude: -0.05, longitude: 0.3}, { latitude: 0.01, longitude: 0.1}, { latitude: 0.08, longitude: 0.3}, { latitude: -0.05, longitude: 0.2}, { latitude: 0.01, longitude: 0.2}, { latitude: 0.08, longitude: 0.2}, { latitude: 0.01, longitude: 0.3}],
    8: [{ latitude: -0.05, longitude: 0.3}, { latitude: 0.01, longitude: 0.1}, { latitude: 0.08, longitude: 0.3}, { latitude: -0.05, longitude: 0.2}, { latitude: 0.01, longitude: 0.2}, { latitude: 0.08, longitude: 0.2}, { latitude: 0.01, longitude: 0.3}, { latitude: -0.05, longitude: 0.1}],
    9: [{ latitude: -0.05, longitude: 0.3}, { latitude: 0.01, longitude: 0.1}, { latitude: 0.08, longitude: 0.3}, { latitude: -0.05, longitude: 0.2}, { latitude: 0.01, longitude: 0.2}, { latitude: 0.08, longitude: 0.2}, { latitude: 0.01, longitude: 0.3}, { latitude: -0.05, longitude: 0.1}, { latitude: 0.08, longitude: 0.1}],
}
