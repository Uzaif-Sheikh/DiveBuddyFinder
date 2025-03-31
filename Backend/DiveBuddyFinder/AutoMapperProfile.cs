using AutoMapper;
using DiveBuddyFinder.Models;
using DiveBuddyFinder.Models.Dtos.DiverDto;
using DiveBuddyFinder.Models.Dtos.Views;

namespace DiveBuddyFinder {

    public class AutoMapperProfile : Profile {
        public AutoMapperProfile()
        {
            CreateMap<Diver, DiverDto>();
            CreateMap<CertificateDetails, CertificateDto>();
            CreateMap<Location, LocationDto>();
            CreateMap<CreateDiverDto, Diver>();
        }
    }


}