package de.iso.apps.service.mapper;

import de.iso.apps.domain.*;
import de.iso.apps.service.dto.FeelWheelDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link FeelWheel} and its DTO {@link FeelWheelDTO}.
 */
@Mapper(componentModel = "spring", uses = {EmployeeMapper.class})
public interface FeelWheelMapper extends EntityMapper<FeelWheelDTO, FeelWheel> {

    @Mapping(source = "employee.id", target = "employeeId")
    @Mapping(source = "employee.email", target = "employeeEmail")
    FeelWheelDTO toDto(FeelWheel feelWheel);

    @Mapping(target = "feelings", ignore = true)
    @Mapping(source = "employeeId", target = "employee")
    FeelWheel toEntity(FeelWheelDTO feelWheelDTO);

    default FeelWheel fromId(Long id) {
        if (id == null) {
            return null;
        }
        FeelWheel feelWheel = new FeelWheel();
        feelWheel.setId(id);
        return feelWheel;
    }
}
