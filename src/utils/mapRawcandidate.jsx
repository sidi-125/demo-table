// src/utils/mapRawCandidate.js
const VERIFIED_SEAFARER_STATUSES = [
    'HIRED',
    'READY_FOR_MATCH',
    'READY_FOR_MATCH_REVIEW',
    'HIRED_REVIEW'
  ];
  
  export const extractAge = (dobTimestamp) => {
    if (!dobTimestamp) return '-';
    const dob = new Date(dobTimestamp * 1000);
    const ageDifMs = Date.now() - dob.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };
  
  export const mapRawCandidate = (rawCandidate) => {
    return {
      id: rawCandidate.number,
      subProfileId: rawCandidate.subProfileId,
      rank: rawCandidate.ranks.current,
      availability: rawCandidate.availabilityDate,
      nationality: rawCandidate.nationalities?.join(', '),
      age_in_year: extractAge(rawCandidate.dateOfBirth),
      seagoing_time_in_rank: rawCandidate.experienceInRank,
      salary_expectation: rawCandidate.salaryExpectation?.voyagePerMonth?.amount,
      currency: rawCandidate.salaryExpectation?.voyagePerMonth?.currency,
      verified: VERIFIED_SEAFARER_STATUSES.includes(
        rawCandidate.verificationStatus
      ).toString(),
      comment: rawCandidate.comment,
      interview_information: rawCandidate.interviewInformation,
      is_saved_candidate: rawCandidate.savedCandidateId === '' ? false : true,
      verification_requested: rawCandidate.verificationRequested,
      profile_visited_status: rawCandidate.profileVisitedStatus,
      last_activity_date: rawCandidate.ltAc,
      achievements_highlights: rawCandidate.achievements,
      fist_name: rawCandidate?.firstName,
      last_name: rawCandidate?.lastName,
      email: rawCandidate?.email,
      mobile: rawCandidate?.mobile,
      countryCode: rawCandidate?.countryCode,
      gender: rawCandidate?.gender,
      experiences: rawCandidate?.experience,
      trainings: rawCandidate?.trainings,
      visas: rawCandidate?.visas,
      profilePicture: rawCandidate?.pictureUrl
    };
  };
  