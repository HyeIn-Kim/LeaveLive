package leavelive.accommodation.service;

import leavelive.accommodation.domain.AccommodationArticle;
import leavelive.accommodation.domain.AccommodationRes;
import leavelive.accommodation.domain.dto.AccommodationFavDto;
import leavelive.accommodation.domain.dto.AccommodationResDto;
import leavelive.accommodation.repository.AccommodationRepository;
import leavelive.accommodation.repository.AccommodationResRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.jni.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AccommodationResServiceImpl {
    private final AccommodationResRepository repo;
    private final AccommodationRepository articleRepo;

    public List<AccommodationResDto> findByUserId(String userId) {
        List<AccommodationRes> entities=repo.findByUserId(userId);
        if(entities==null) throw new NullPointerException("예약한 숙소가 없습니다.");
        List<AccommodationResDto> list=new ArrayList<>();
        for (int i=0; i<entities.size(); i++){
            AccommodationResDto dto=new AccommodationResDto();
            list.add(dto.of(entities.get(i)));
        }
        return list;
    }
    public Long saveReservation(String userId, Long id, AccommodationResDto request){
        Optional<AccommodationArticle> entity=articleRepo.findById(id);
        LocalDate myStart=request.getStartDate();
        LocalDate myEnd=request.getEndDate();
        if(!entity.isPresent()) throw new NullPointerException("해당하는 숙소가 없습니다.");
        if(myStart.isAfter(myEnd)) throw new NullPointerException("종료일이 시작일보다 앞입니다.");
        if(request.getCnt()<=0 || request.getCnt()>entity.get().getCnt()) throw new NullPointerException("인원수가 0이하거나 수용할 수 있는 인원을 초과했습니다.");
        // 예약이 되어있는지 확인
        List<AccommodationRes> list=repo.findByAccommodationArticleId(id);
        log.info("AccommodationResService.saveReservation.list:"+list);
        if(list!=null || list.size()>0){
            boolean flag=true;
            for (AccommodationRes res:list){
                LocalDate start=res.getStartDate();
                LocalDate end=res.getEndDate();
                if(!start.isEqual(myStart) && !end.isEqual(myEnd)){
                    /**
                     * myStart와 myEnd가 구간 안에 있으면 이미 예약되어있으므로 예약 불가
                     * start<=myStart<end ->x
                     * start<myEnd<=end ->x
                     */            
                    if(!myStart.isBefore(start) && myStart.isBefore(end)){
                        log.info("AccommodationResService.saveReservation:시작날짜가 잘못되었음");
                        flag=false;
                        break;
                    }
                    start=start.plusDays(1);
                    if(!myEnd.isBefore(start) && myEnd.isBefore(end)){
                        log.info("AccommodationResService.saveReservation:종료날짜가 잘못되었음");
                        flag=false;
                        break;
                    }
                }else{
                    flag=false;
                    break;
                }
            }
            if(!flag) throw new NullPointerException("이미 해당 기간에 예약되어 있는 숙소입니다.");
        }
        AccommodationResDto dto=new AccommodationResDto();
        dto.setAccommodationArticle(entity.get());
        dto.setUserId(userId);
        dto.setStartDate(myStart);
        dto.setEndDate(myEnd);
        dto.setCnt(request.getCnt());
        dto.setScheduleId(request.getScheduleId());
        log.info("AccommodationServiceTest.saveReservation.dto:"+dto);
        AccommodationRes accommodationRes=new AccommodationRes();
        AccommodationRes result=repo.save(accommodationRes.of(dto));
        return result.getId();
    }
    public String deleteReservation(String userId,Long id){
        Optional<AccommodationRes> entity=repo.findById(id);
        if(!entity.isPresent()) throw new NullPointerException("해당하는 숙소가 없습니다.");
        log.info("비교"+entity.get().getUserId());
        if(!entity.get().getUserId().equals(userId)) throw new NullPointerException("자신이 등록한 예약만 삭제할 수 있습니다.");
        repo.deleteById(id);
        return "ok";
    }
}
